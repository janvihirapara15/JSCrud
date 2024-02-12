window.alert("hii");
// localdata #1
let records = JSON.parse(localStorage.getItem("localdata")) || [];
let isEdit = -1;
// delete
const handleDelete = (value) => {
    const deleteData = records.filter((item, index) => { return index !== value });
    console.log(deleteData);
    // localdata2
    localStorage.setItem("localdata", JSON.stringify(deleteData))
    records = deleteData;
    renderHTMLTAble();
}
// edit
const handleEdit = (abc) => {
    isEdit = abc;
    const Editdata = records.find((item, index) => { return index === abc });

    document.getElementById("fname").value = Editdata.fname;
    document.getElementById("lname").value = Editdata.lname;
    document.getElementById("email").value = Editdata.email;
}
// sorting
const handleSort = () => {
    const sortedArray = document.getElementById("select").value;
    if (sortedArray === "Fname") {
        let sorted = records.sort((a, b) => a.fname.localeCompare(b.fname))
        records = sorted;
    } else if (sortedArray === "Lname") {
        let sorted = records.sort((a, b) => a.lname.localeCompare(b.lname))
        records = sorted;
    } else if (sortedArray === "Email") {
        ``
        let sorted = records.sort((a, b) => a.email.localeCompare(b.email))
        records = sorted;
    }
    renderHTMLTAble();
}
// search button

function myFunction() {

    let search = document.getElementById("myInput").value;
    let filtereddata = records.filter((item) => { return (item.fname.toLocaleLowerCase() === search.toLocaleLowerCase() || item.lname.toLocaleLowerCase() === search.toLocaleLowerCase()) });
    records = filtereddata;
    renderHTMLTAble();
}

// renderHTMLTAble
const renderHTMLTAble = () => {
    document.getElementById("Hello").innerHTML = records.map((item, index) => {
        return `<tr>
        <td>${item.fname}</td>
        <td>${item.lname}</td>
        <td>${item.email}</td>
        <td><button onclick=handleDelete(${index})>Delete</button></td>
        <td><button onclick=handleEdit(${index})>Edit</button></td>
        </tr>`}).join("")
}

renderHTMLTAble();

const handleSubmit = () => {
    const j = document.getElementById("fname").value;
    console.log(j);
    const a = document.getElementById("lname").value;
    console.log(a);
    const n = document.getElementById("email").value;
    console.log(n);


    const janvi = { fname: j, lname: a, email: n }
    if (isEdit !== -1) {
        const updated = records.map((item, index) => {
            if (index === isEdit) return janvi;
            else return item
        });
        // localdata #2
        localStorage.setItem("localdata", JSON.stringify(updated))
        records = updated;
        renderHTMLTAble()
    }
    // duplicate
    else {
        const Duplicate = records.some((item) => item.fname === j || item.lname === a);
        console.log(Duplicate);
        if (Duplicate) {
            console.log("please select another name");
        }
        else {
            records.push(janvi);
            renderHTMLTAble();
        }
        
       
        // localdata #0
        localStorage.setItem("localdata", JSON.stringify(records))
        console.log(records);
        renderHTMLTAble();
    }
    
}