package router

import (
	"Portfolio/src/templates"
	"net/http"
)

func InitSuppRoute() {
	http.HandleFunc("/todo/supp", func(w http.ResponseWriter, r *http.Request) {
		templates.Temp.ExecuteTemplate(w, "todo", nil)
	})
}
