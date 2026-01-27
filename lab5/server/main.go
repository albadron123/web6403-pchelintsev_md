package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	//====================================SETTING UP THE ROUTER===================================================
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/mailinglist", post_mailingList_stub)
	router.POST("/form", post_form_stub)

	router.Run("localhost:8080")

}

func post_mailingList_stub(c *gin.Context) {
	fmt.Println("mailing list recieved")
	time.Sleep(1 * time.Second)
	c.JSON(http.StatusCreated, gin.H{})
}

func post_form_stub(c *gin.Context) {
	fmt.Println("letter recieved")
	time.Sleep(1 * time.Second)
	c.JSON(http.StatusCreated, gin.H{})
}
