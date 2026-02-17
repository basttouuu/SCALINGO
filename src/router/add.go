package router

import (
	"Portfolio/src/templates"
	"net/http"
)

func InitAddRoute() {
	http.HandleFunc("/todo/add", func(w http.ResponseWriter, r *http.Request) {
		templates.Temp.ExecuteTemplate(w, "todo", nil)
	})
}
