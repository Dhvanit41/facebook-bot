const socket =io();



// socket.on('countUpdated',(count)=>{
//     console.log("The Count hasbeen Updated",count)
// })

// document.getElementById("increment").addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })


socket.on("message",(messageText)=>{
    console.log(messageText)
})

document.getElementById("increment").addEventListener('click',()=>{
    console.log('clicked')
    socket.emit("sendMessage","Message From form.")
})