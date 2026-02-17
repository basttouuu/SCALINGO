package templates

import (
	"fmt"
	"html/template"
	"os"
)

var Temp *template.Template

func InitTemplates() {
	var err error
	Temp, err = template.ParseGlob("src/templates/*.html")
	if err != nil {
		fmt.Println("Erreur chargement templates:", err)
		os.Exit(1)
	}
	fmt.Println("Templates chargés avec succès")
}
