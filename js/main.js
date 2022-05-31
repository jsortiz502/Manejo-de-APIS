const API = "https://api.github.com/users/";


const app = Vue.createApp({
    data() {                //SE agregan los atributos
      return {
        busqueda: null,
        resultado: null,//un vacio o no hay nada
        fail: null,
        favoritos: new Map()//aqui se guarda o almacenara las busquedas favoritas o que seran agregadas
      }   
    },
    computed: {
        esFavorito(){
          return this.favoritos.has(this.resultado.id)
        },

        allFavoritos(){
          return Array.from(this.favoritos.values())
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
            
        },
      addFavorito(){
        //la clave de este map es el 'id' y su valor es el 'resultado'
        this.favoritos.set(this.resultado.id, this.resultado)
        this.updateFavorito()
      },
      //Aqui se eliminan los que se hayan añadido como favoritos
      removeFavorito(){
        this.favoritos.delete(this.resultado.id)
        this.updateFavorito()
      },
      //guardar en cache los usuarios añadidos como favoritos
      //de manera persistente
      updateFavorito(){
        window.localStorage.setItem('favoritos',JSON.stringify(this.allFavoritos))
      }

    }
  })