<template>
<div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="hdados"
      :items="crosswalks"
      sort-by="id"
      :search="search"
      class="elevation-1"
      :footer-props="{'items-per-page-options':[-1, 5, 20, 50, 100]}"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>SPWS CRUD</v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"> {{ formTitle }} </span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.latitude" label="LATITUDE"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.longitude" label="LONGITUDE"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nPedestrians" label="PEDESTRES AGORA"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nCars" label="CARROS AGORA"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.totalPedestrians" label="PEDESTRES TOTAL"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.totalCars" label="CARROS TOTAL"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


<v-dialog v-model="dialogPedestrians" max-width="800px">
<v-card>
  <v-card-text>
        <div style="padding:10px 20px">
          <h2 style="margin:20px 0px;">PEDESTRIANS NOW:</h2>
          <p v-for="p in pedestres" v-bind:key='p' style="background:#E8E8E8;padding:5px;">
            ID: {{ p.id }}<br>
            LATITUTDE:{{ p.latitude }}<br>
            LONGITUDE:{{ p.longitude }}<br>
            E-MAIL:{{ p.email }}
          </p>
          <br>
          <h2 style="margin:20px 0px;">PEDESTRIANS PAST HISTORY:</h2>
          <span v-for="pH in pedestresHistory" v-bind:key='pH'>
            <p v-if="pH.passadeira_id == clickedPassadeira" style="background:#E8E8E8;padding:5px;">
            DATETIME: {{ pH.hora }}<br>
            LATITUTDE:{{ pH.latitude }}<br>
            LONGITUDE:{{ pH.longitude }}<br>
            E-MAIL:{{ pH.email }}
            </p>
          </span>
        </div>
  </v-card-text>


<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn @click="close">EXIT</v-btn>
</v-card-actions>
</v-card>
 </v-dialog>
 
 <v-dialog v-model="dialogCars" max-width="800px">
<v-card>
  <v-card-text>
        <div style="padding:10px 20px">
          <h2 style="margin:20px 0px;">CARS NOW:</h2>
          <p v-for="c in cars" v-bind:key='c' style="background:#E8E8E8;padding:5px;">
            ID: {{ c.id }}<br>
            LATITUTDE:{{ c.latitude }}<br>
            LONGITUDE:{{ c.longitude }}<br>
            MATRÍCULA:{{ c.matricula }}
          </p>
          <br>
          <h2 style="margin:20px 0px;">CARS PAST HISTORY:</h2>
          <span v-for="cH in carsHistory" v-bind:key='cH'>
            <p v-if="cH.passadeira_id == clickedPassadeira" style="background:#E8E8E8;padding:5px;">
            DATETIME: {{ cH.hora }}<br>
            LATITUTDE:{{ cH.latitude }}<br>
            LONGITUDE:{{ cH.longitude }}<br>
            MATRICULA:{{ cH.matricula }}
            </p>
          </span>
        </div>
  </v-card-text>

 <v-card-actions>
  <v-spacer></v-spacer>
  <v-btn @click="close">EXIT</v-btn>
</v-card-actions>
</v-card>

 </v-dialog>

        </v-toolbar>

          <v-html>
            <br><br>
          </v-html>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-html
          small
          @click="showCars(item)"
        >
          | <button type="button">Cars</button> |
        </v-html>
        <v-html
          small
          @click="showPedestres(item)"
        >
          <button type="button">Pedestres</button>
        </v-html>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;
const lhostPedestres = require("@/config/global").pedestres;
const lhostCars = require("@/config/global").cars;

export default {
  name: 'ListCrosswalks',

  data: () => ({
    search: '',
    dialog: false,
    dialogPedestrians: false,
    dialogCars: false,
    hdados: [
      {text: "ID", sortable: true, value: 'id', class: 'subtitle-1'},
      {text: "LATITUDE", sortable: true, value: 'latitude', class: 'subtitle-1'},
      {text: "LONGITUDE", sortable: true, value: 'longitude', class: 'subtitle-1'},
      {text: "PEDESTRES AGORA", sortable: true, value: 'nPedestrians', class: 'subtitle-1'},
      {text: "CARROS AGORA", sortable: true, value: 'nCars', class: 'subtitle-1'},
      {text: "PEDESTRES TOTAL", sortable: true, value: 'totalPedestrians', class: 'subtitle-1'},
      {text: "CARROS TOTAL", sortable: true, value: 'totalCars', class: 'subtitle-1'},
      {text: 'Actions', value: 'actions', sortable: false },
    ],
    crosswalks: [],

  pedestres: [],
  pedestresHistory: [],
  cars: [],
  clickedPassadeira: '',
  carsHistory: [],
  editedIndex: -1,
    editedItem: {
      //id: 0,
      latitude: 0,
      longitude: 0,
      nPedestrians: 0,
      nCars: 0,
      totalPedestrians: 0,
      totalCars: 0,
    },
    defaultItem: {
//      id: 0,
      latitude: 0,
      longitude: 0,
/*      nPedestrians: 0,
      nCars: 0,
      totalPedestrians: 0,
      totalCars: 0,*/
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    /*processedPedestres() {
      let processedPedestres = this.pedestres;
      return processedPedestres;
    }*/
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogPedestrians (val) {
      val || this.close()
    },
    dialogCars (val) {
      val || this.close()
    },
  },

  created: async function(){
    try {
      let response = await axios.get(lhost + "/api/passadeiras");
      this.crosswalks = response.data

    } 
    catch (e) {
      return e;
    }
    this.timer = setInterval(this.updateData, 1000)
  },



  methods: {
updateData () {

      axios.get(lhost + "/api/passadeiras")
      .then(response => {
          this.crosswalks = response.data
      })
      .catch(erro => {
        console.log(erro)
      })
    
},

    showCars (item) {
      this.clickedPassadeira = item.id
      var _self = this

      try {
          axios.get(lhostCars + "/api/passadeira/" + item.id)
           .then(response => {
            _self.cars = response.data

                      axios.get(lhost + "/api/json/cars")
                      .then(dados => {
                          _self.carsHistory = dados.data;
                      })
                      .catch(erro => {
                        console.log(erro)
                      })

            _self.dialogCars = true
          })
        .catch(erro => {
          console.log(erro)
        })

        }
      catch (e) {
        return e;
      }
    },

    /*readFile (fName) {
            var fs = require('fs');
            var path = require('path');
            let file = path.join(__dirname, fName);
            fs.readFile(file, 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                let fileJson = JSON.parse(data);//now it an object
                let json = JSON.stringify(fileJson); //convert it back to json
                return json;
            }});
    },*/

    showPedestres (item) {
      this.clickedPassadeira = item.id
      var _self = this

      try {
          axios.get(lhostPedestres + "/api/passadeira/" + item.id)
            .then(function (response) {
           //.then(response => {
            _self.pedestres = response.data

                      axios.get(lhost + "/api/json/pedestres")
                      .then(dados => {
                          _self.pedestresHistory = dados.data;
                      })
                      .catch(erro => {
                        console.log(erro)
                        alert(erro)
                      })

            _self.dialogPedestrians = true
          })
        .catch(erro => {
          console.log(erro)
          alert(erro)
        })

        }
      catch (e) {
        return e;
      }
    },


    editItem (item) {
      this.editedIndex = this.crosswalks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.crosswalks.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.crosswalks.splice(index, 1)
        try {
          axios.delete(lhost + "/api/passadeiras/" +item.id);
        } 
        catch (e) {
          return e;
        }
    },

    close () {
      this.dialog = false
      this.dialogPedestrians = false
      this.dialogCars = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      //EDIT SAVE
      if (this.editedIndex > -1) {
        Object.assign(this.crosswalks[this.editedIndex], this.editedItem)
        try {
          axios.put(lhost + "/api/update/" +this.editedItem.id, this.editedItem);
        } 
        catch (e) {
          return e;
        }
      this.close()
      } 

      //NEW ITEM SAVE
      else {
        //this.crosswalks.push(this.editedItem)
        try {
          axios.post(lhost + "/api/new", this.editedItem);
        } 
        catch (e) {
          return e;
        }
        location.reload()

      }
    },
  //this.close()
  }
  
}
</script>
