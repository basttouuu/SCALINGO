package router

import (
	"Portfolio/src/templates"
	"database/sql"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Task struct {
	ID        int64
	Text      string
	Priority  string
	Completed bool
	CreatedAt string
}

type TodoData struct {
	Tasks []Task
}

var db *sql.DB

func InitTodoRoute() {
	connectDB()
	createTable()

	http.HandleFunc("/todo", todoHandler)
	http.HandleFunc("/todo/add", addTaskHandler)
	http.HandleFunc("/todo/toggle", toggleTaskHandler)
	http.HandleFunc("/todo/delete", deleteTaskHandler)
	http.HandleFunc("/todo/clear", clearAllHandler)
}

func connectDB() {
	user := os.Getenv("SCALINGO_MYSQL_USER")
	password := os.Getenv("SCALINGO_MYSQL_PASSWORD")
	host := os.Getenv("SCALINGO_MYSQL_HOST")
	port := os.Getenv("SCALINGO_MYSQL_PORT")
	database := os.Getenv("SCALINGO_MYSQL_DB")

	dsn := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + database

	var err error
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Erreur ouverture DB:", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Erreur connexion DB:", err)
	}
	log.Println("Connecte a la base de donnees")
}

func createTable() {
	query := `CREATE TABLE IF NOT EXISTS tasks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		text TEXT NOT NULL,
		priority VARCHAR(20),
		completed BOOLEAN DEFAULT FALSE,
		created_at VARCHAR(50)
	)`
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal("Erreur creation table:", err)
	}
}

func getTasks() []Task {
	rows, err := db.Query("SELECT id, text, priority, completed, created_at FROM tasks ORDER BY id DESC")
	if err != nil {
		log.Println("Erreur lecture tasks:", err)
		return []Task{}
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var t Task
		err = rows.Scan(&t.ID, &t.Text, &t.Priority, &t.Completed, &t.CreatedAt)
		if err == nil {
			tasks = append(tasks, t)
		}
	}
	return tasks
}

func todoHandler(w http.ResponseWriter, r *http.Request) {
	data := TodoData{
		Tasks: getTasks(),
	}
	templates.Temp.ExecuteTemplate(w, "todo", data)
}

func addTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		text := r.FormValue("text")
		priority := r.FormValue("priority")

		if text != "" {
			createdAt := time.Now().Format("2006-01-02 15:04:05")
			_, err := db.Exec("INSERT INTO tasks(text, priority, completed, created_at) VALUES(?, ?, ?, ?)",
				text, priority, false, createdAt)
			if err != nil {
				log.Println("Erreur ajout task:", err)
			}
		}
	}
	http.Redirect(w, r, "/todo", http.StatusSeeOther)
}

func toggleTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		idStr := r.FormValue("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err == nil {
			_, err = db.Exec("UPDATE tasks SET completed = NOT completed WHERE id = ?", id)
			if err != nil {
				log.Println("Erreur toggle task:", err)
			}
		}
	}
	http.Redirect(w, r, "/todo", http.StatusSeeOther)
}

func deleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		idStr := r.FormValue("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err == nil {
			_, err = db.Exec("DELETE FROM tasks WHERE id = ?", id)
			if err != nil {
				log.Println("Erreur suppression task:", err)
			}
		}
	}
	http.Redirect(w, r, "/todo", http.StatusSeeOther)
}

func clearAllHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		_, err := db.Exec("TRUNCATE TABLE tasks")
		if err != nil {
			log.Println("Erreur clear tasks:", err)
		}
	}
	http.Redirect(w, r, "/todo", http.StatusSeeOther)
}
