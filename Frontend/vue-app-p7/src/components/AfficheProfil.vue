<template>
    <div>
        <h1>{{ user.username }}</h1>
        <div>
            <form>
                <table>
                    <tr>
                        <td>
                            <label for="email">Email :</label><input type="email" name="email" v-model="user.email" id="email" /><p id="emailPasConforme"></p><br>
                            <label for="username">Nom d'utilisateur :</label><input type="text" name="username" v-model="user.username" id="username" /><p id="usernamePasConforme"></p><br>
                            <p><i>La valeur ne sera pas mise à jour si vous ne touchez pas au champ</i></p>
                        </td>
                        <td>
                            <img :src="user.avatar" alt="user.username"><br>
                            <button class="button" @click.prevent="updateUser">Mettre à jour</button><br>
                            <button class="button" @click.prevent="deleteUser">Supprimer le compte</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'AfficheProfil',
    data() {
        return{
            email:"",
            avatar:"",
            username:"",
            user:[]
        }
    },
    async created(){
        this.user = [];
        
        await axios
            .get('http://localhost:8080/api/users/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(
                (response) => ((this.user = response.data), console.log(response))
            )
            .catch((error) => console.log(error));
    },
    methods: {
        updateUser(){
            var emailup, usernameup, avatarup;
            axios.get('http://localhost:8080/api/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    }
                })
            .then(function (response) {
                const emailbdd = response.data.email;
                const usernamebdd = response.data.username;
                const avatarbdd = response.data.avatar;
                if (document.getElementById('email').value != "")
                    emailup = document.getElementById('email').value;
                else
                    emailup = emailbdd;
                if (document.getElementById('username').value != "")
                    usernameup = document.getElementById('username').value;
                else
                    usernameup = usernamebdd;
                /*if (document.getElementById('avatar').value != null)
                    avatarup = this.avatar;
                else*/
                    avatarup = avatarbdd;
                if (userToken === null){
                    return status(400).json({ 'error': 'Mauvais token' });
                } else {
                    axios('http://localhost:8080/api/users/', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                        },
                        data: {
                            email:emailup,
                            username:usernameup,
                            avatar:avatarup
                        },
                    })
                    .then(
                        (response) => ((this.user = response.data), console.log(response))
                    )
                    .catch((error) => console.log(error)
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            }); 
        },
        deleteUser(){
            axios.delete('http://localhost:8080/api/users/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(function () {
                alert("Compte supprimé");
                localStorage.clear();
                document.location.replace('http://localhost:8081/');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        }
    }
}
</script>
