let black = document.querySelector('.popup-black')

let list = document.querySelector('.list')
let form = document.forms.add
let form2 = document.forms.edit
let base_url = "http://localhost:9999"
let box25 = document.querySelector('.box25')
let box50 = document.querySelector('.box50')
let boxOther = document.querySelector('.boxOther')
const getAllData = async () => {
    try {
        const res = await fetch(base_url + "/users")

        if (res.status === 200 || res.status === 201) {

            const data = await res.json()
            relaod(data)
        }

    } catch (e) {
        alert('connection error!')
    }

}
getAllData()

function relaod(arr) {
    box25.innerHTML = ' '
    for (let item of arr) {
        let userBlock = document.createElement('div')
        let userName = document.createElement('h2')
        let ageBlock = document.createElement('div')
        let spanAge = document.createElement('span')
        let age = document.createElement('p')
        let del = document.createElement('p')

        userBlock.classList.add('userBlock')
        ageBlock.classList.add('ageBlock')


        userName.innerHTML = item.name
        spanAge.innerHTML = "Age"
        age.innerHTML = item.age
        del.innerHTML = 'delete'

        ageBlock.append(spanAge, age)
        userBlock.append(userName, ageBlock, del)

        box25.append(userBlock)
        del.onclick = async () => {
            const res = await fetch(base_url + "/users/" + item.id, {
                method: "delete"
            })
            if (res.status === 200 || res.status === 201) {
                userBlock.remove()
            }
        }
        ageBlock.onclick = () => {
            black.style.display = 'block'
            setTimeout(() => {
                black.style.opacity = '1'
            }, 200)
        }
        // black.onclick = () => {
        //     black.style.opacity = '0'
        //     setTimeout(() => {
        //         black.style.display = 'none'
        //     }, 400)
        // }

        form2.onsubmit = async (data) => {
            data.preventDefault()
            let name = document.querySelector('.EditName')
            let ageEd = document.querySelector('.EditAge')
            const res = await fetch(base_url + "/users/" + item.id, {
                method: "PATCH",
                body: JSON.stringify({
                    name: name.value,
                    age: ageEd.value
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (res.status === 200 || res.status === 201) {
                userName.innerHTML = name.value
                age.innerHTML = ageEd.value
                black.style.opacity = '0'
                setTimeout(() => {
                    black.style.display = 'none'
                }, 400)
            }
        }
    }
}

form.onsubmit = (event) => {
    event.preventDefault()

    let user = {
        id: Math.random(),
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);
    createNewUser(user)
    getAllData()

}

const createNewUser = async (body) => {
    try {
        const res = await fetch(base_url + "/users", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (res.status === 200 || res.status === 201) {

            console.log(res)
        }
    } catch (e) {
        alert('error')
    }
}


