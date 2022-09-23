const posts = [
    {title: 'Post One', body: 'This is post one' , createdAt: new Date().getTime()},
    {title: 'Post Two', body: 'This is post two' , createdAt: new Date().getTime()}
];
let intervalID;
function getPosts(){
    // clearInterval(intervalID);
    // let intervalId = setInterval(()=>{
        let output = '';
        posts.forEach((post)=> {
            output += `<li>${post.title} -created ${Math.floor((new Date().getTime() - post.createdAt)/1000)} sec ago</li>`
        });
        document.body.innerHTML = output;
    // },1000)
}
// getPosts();

function createPost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push({...post,createdAt:new Date().getTime()});
            const error = false;
            if(!error){
                resolve();
            }else{
                reject('Error: something went wrong');
            }
        },0)    
    })
}
function deletePost(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(posts.length != 0){
                posts.pop();
                resolve();
            }
            else
            {
                reject('Error: No Posts to remove')
            }
        },1000)
    })
}

// function createPost4(post,callback){
//     setTimeout(()=>{
//         callback({title:'Post Three', body: 'This is post three'},getPosts);
//         posts.push({...post,createdAt:new Date().getTime()});
//         console.log(posts);
//     },5000);
// }

createPost({title:'Post Three', body: 'This is post three'})
.then(getPosts)
.catch((err)=>{console.log(err)});
setTimeout(getPosts,500);

// createPost4({title:'Post Four', body: 'This is post four'},getPosts);
// deletePost()
// .then(()=>{getPosts();
//             deletePost()
//             .then(()=>{
//                 getPosts();
//                 deletePost()
//                 .then(()=>{
//                     getPosts();
//                     deletePost().then()
//                     .catch((err)=>console.log(err));
//                 })
//                 .catch((err)=>console.log(err));
//             })
//             .catch((err)=>console.log(err));
//         })
// .catch((err)=>console.log(err));
let lastActivityTime;
let promise1 =  new Promise((resolve,reject)=>{
    // setTimeout(()=>{
    createPost({title:'Post four ', body: 'Post four using promise all'});  
    resolve();  
// },500);

});
let promise2 = new Promise((resolve,reject)=>{
     setTimeout(()=>{
        lastActivityTime = new Date();
        resolve(lastActivityTime);
    // 
 },500);
    });


Promise.all([promise1,promise2]).then(console.log(lastActivityTime))
// ({title:'Post Three', body: 'This is post three'})
promise2.then((lastActivityTime)=>{console.log(`promise 2 resolved ${lastActivityTime} `)});