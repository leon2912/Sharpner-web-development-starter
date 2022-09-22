const posts = [
    {title: 'Post One', body: 'This is post one' , createdAt: new Date().getTime()},
    {title: 'Post Two', body: 'This is post two' , createdAt: new Date().getTime()}
];
let intervalID;
function getPosts(){
    clearInterval(intervalID);
    let intervalId = setInterval(()=>{
        let output = '';
        posts.forEach((post)=> {
            output += `<li>${post.title} -created ${Math.floor((new Date().getTime() - post.createdAt)/1000)} sec ago</li>`
        });
        document.body.innerHTML = output;
    },1000)
}
// getPosts();

function createPost(post,callback){
    setTimeout(()=>{
        posts.push({...post,createdAt:new Date().getTime()});
        console.log(posts);
        callback();
    },1000)
}

function createPost4(post,callback){
    setTimeout(()=>{
        callback({title:'Post Three', body: 'This is post three'},getPosts);
        posts.push({...post,createdAt:new Date().getTime()});
        console.log(posts);
    },5000);
}

createPost({title:'Post Three', body: 'This is post three'},getPosts);
createPost4({title:'Post Four', body: 'This is post four'},getPosts);