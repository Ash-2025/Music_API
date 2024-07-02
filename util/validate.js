import axios from "axios";
const btn = document.getElementsByTagName('button');
const input = document.getElementById("base-input");
const baseurl = "https://musico-production.up.railway.app/";
let inputurl = "";

input.addEventListener('input', (e) => {
    inputurl = e.target.value;

})

function validate(inputurl) {
    console.log("input url in function call - ", inputurl);
    if (!inputurl.startsWith(baseurl)) {
        return false;
    }

    const path = inputurl.substring(baseurl.length);

    const parts = path.split('/');

    switch (parts.length) {
        case 2:
            if (parts[0] == 'artists') {
                console.log(`valid ${inputurl}`);
                return true;
            }
            else if (parts[0] === 'songs') {
                console.log('Valid URL for song:', inputurl);
                return true;
            } else if (parts[0] === 'albums') {
                console.log('Valid URL for album:', inputurl);
                return true;
            }
            break;
        default:
            return false;
    }
    return false;
}

btn[0].addEventListener('click', () => {
    if (validate(inputurl)) {
        axios.get(inputurl).then((res) => {
            console.log(res.json());
        }).catch((e) => {
            console.log(e);
        })
    }
})