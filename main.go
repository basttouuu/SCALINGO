package main

import (
	"Portfolio/src/router"
	"Portfolio/src/templates"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		// Le fichier .env est optionnel, on continue sans lui
		// mais on prévient l'utilisateur
		// log.Println("Aucun fichier .env trouvé")
	}

	templates.InitTemplates()

	router.InitRoutes()

	router.StartServer()
}
