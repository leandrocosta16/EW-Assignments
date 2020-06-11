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


<v-dialog v-model="dialog2" max-width="500px">
<v-card>

  <v-card-text>
    <v-container>
      <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <span class="headline"> {{ pedestres }} </span>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <span class="headline"> {{ cars }} </span>
                    </v-col>

      </v-row>
    </v-container>
  </v-card-text>
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
    dialog2: false,
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

  pedestres: '',
  cars: '',
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

    processedPedestres() {
      let processedPedestres = this.pedestres;
      return processedPedestres;
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialog2 (val) {
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
  },

  methods: {
    /*rowClicked: function(item){
      alert('Click no item: ' + JSON.stringify(item))
    },

    test: function(id){
      alert(id)
    },

   fireDelete(id) {
        axios.delete('/item/'+id).then();
    },*/

    showCars (item) {
      var _self = this

      try {
          axios.get(lhostCars + "/api/passadeira/" + item.id)
           .then(response => {
            _self.cars = response.dados
            _self.dialog2 = true
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

    showPedestres (item) {
      var _self = this

      try {
          axios.get(lhostPedestres + "/api/passadeira/" + item.id)
            .then(function (response) {
           //.then(response => {
            _self.pedestres = response.dados
            _self.dialog2 = true
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
