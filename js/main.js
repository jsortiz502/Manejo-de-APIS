const API = "https://api.github.com/users/";


const app = Vue.createApp({
    data() {                //SE agregan los atributos
      return {
        busqueda: null,
        resultado: null,//un vacio o no hay nada
         fail: null
      }
    },
    methods: {
        async Buscar(){
          try{
            const response = await fetch(API + this.busqueda)
            //Si ok es false, 
            if(!response.ok) throw ("El usuario no existe")
            const data = await response.json()
            console.log(data)           
            this.resultado = data
            this.fail = null
            

          } catch (error) {
            this.fail = error
            this.resultado = false

          }finally{
            //finalmente hacer que la busqueda quede vacia
            this.busqueda = null
            
          }
            
        }
    },
  })