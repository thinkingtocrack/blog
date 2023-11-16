// for haveing a dropdown in header
let p_dropdown=document.getElementById("profile-dropdown")
let head=document.getElementsByTagName('header')[0]
    p_dropdown.addEventListener('click',()=>{
        let dropdown = document.getElementById('dropdown')
        if (window.getComputedStyle(dropdown).display === 'none') {
            dropdown.style.display='block'
            head.style.height='120px'
            
        }else{
            dropdown.style.display = 'none'
            head.style.height='60px'
        }
    })


// for deletting a user
function conform(a){
    return confirm(`are you sure you want to delete the user ${a}`)
}