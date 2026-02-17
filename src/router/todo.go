package router

import (
	"Portfolio/src/templates"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Task struct {
	ID        int64  `json:"id"`
	Text      string `json:"text"`
	Priority  string `json:"priority"`
	Completed bool   `json:"completed"`
	CreatedAt string `json:"createdAt"`
}

var db *sql.DB

func InitTodoRoute() {
	connectDB()
	createTable()

	http.HandleFunc("/todo", func(w http.ResponseWriter, r *http.Request) {
		templates.Temp.ExecuteTemplate(w, "todo", nil)
	})

	http.HandleFunc("/api/tasks", tasksHandler)
	http.HandleFunc("/api/tasks/", taskActionHandler)
	http.HandleFunc("/api/tasks/clear", clearHandler)
}

func connectDB() {
	SCALINGO_MYSQL_USER := os.Getenv("SCALINGO_MYSQL_USER")

	SCALINGO_MYSQL_PASSWORD := os.Getenv("SCALINGO_MYSQL_PASSWORD")

	SCALINGO_MYSQL_HOST := os.Getenv("SCALINGO_MYSQL_HOST")

	SCALINGO_MYSQL_PORT := os.Getenv("SCALINGO_MYSQL_PORT")

	SCALINGO_MYSQL_DB := os.Getenv("SCALINGO_MYSQL_DB")

	dsn := SCALINGO_MYSQL_USER + ":" + SCALINGO_MYSQL_PASSWORD + "@tcp(" + SCALINGO_MYSQL_HOST + ":" + SCALINGO_MYSQL_PORT + ")/" + SCALINGO_MYSQL_DB

	var err error
	if db, err = sql.Open("mysql", dsn); err != nil {
		log.Fatal("Erreur ouverture DB:", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal("Erreur connexion DB:", err)
	}
	log.Println("Connecte a la base de donnees avec succes")
}

func createTable() {
	query := `CREATE TABLE IF NOT EXISTS tasks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		text TEXT NOT NULL,
		priority VARCHAR(20),
		completed BOOLEAN DEFAULT FALSE,
		created_at VARCHAR(50)
	)`
	if _, err := db.Exec(query); err != nil {
		log.Fatal("Erreur creation table:", err)
	}
}

func jsonResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}

func tasksHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		rows, err := db.Query("SELECT id, text, priority, completed, created_at FROM tasks ORDER BY id DESC")
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		defer rows.Close()

		var tasks []Task
		for rows.Next() {
			var t Task
			if err := rows.Scan(&t.ID, &t.Text, &t.Priority, &t.Completed, &t.CreatedAt); err == nil {
				tasks = append(tasks, t)
			}
		}
		if tasks == nil {
			tasks = []Task{}
		}
		jsonResponse(w, 200, tasks)
		return
	}

	if r.Method == "POST" {
		var t Task
		if json.NewDecoder(r.Body).Decode(&t) != nil {
			http.Error(w, "Bad Request", 400)
			return
		}
		if t.CreatedAt == "" {
			t.CreatedAt = time.Now().Format(time.RFC3339)
		}

		res, err := db.Exec("INSERT INTO tasks(text, priority, completed, created_at) VALUES(?, ?, ?, ?)",
			t.Text, t.Priority, t.Completed, t.CreatedAt)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		t.ID, _ = res.LastInsertId()
		jsonResponse(w, 201, t)
		return
	}
	http.Error(w, "Method not allowed", 405)
}

func taskActionHandler(w http.ResponseWriter, r *http.Request) {
	var t Task
	if json.NewDecoder(r.Body).Decode(&t) != nil {
		http.Error(w, "Bad Request", 400)
		return
	}

	if r.Method == "PUT" {
		if _, err := db.Exec("UPDATE tasks SET text=?, priority=?, completed=? WHERE id=?",
			t.Text, t.Priority, t.Completed, t.ID); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, t)
		return
	}

	if r.Method == "DELETE" {
		if _, err := db.Exec("DELETE FROM tasks WHERE id=?", t.ID); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, map[string]string{"result": "deleted"})
		return
	}
	http.Error(w, "Method not allowed", 405)
}

func clearHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "DELETE" {
		if _, err := db.Exec("TRUNCATE TABLE tasks"); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, map[string]string{"result": "cleared"})
		return
	}
	http.Error(w, "Method not allowed", 405)
}
