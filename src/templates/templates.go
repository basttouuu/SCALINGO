package templates

import (
	"fmt"
	"html/template"
	"os"
)

var Temp *template.Template

func InitTemplates() {
	var err error
	
	funcMap := template.FuncMap{
		"add": func(a, b int) int {
			return a + b
		},
	}
	
	Temp, err = template.New("").Funcs(funcMap).ParseGlob("src/templates/*.html")
	if err != nil {
		fmt.Println("Erreur chargement templates:", err)
		os.Exit(1)
	}
	fmt.Println("Templates charges avec succes")
}
