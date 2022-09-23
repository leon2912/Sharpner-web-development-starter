const posts = [
    {title: 'Post One', body: 'This is post one' , createdAt: new Date().getTime()},
    {title: 'Post Two', body: 'This is post two' , createdAt: new Date().getTime()}
];

function getPosts(){
        let output = '';
        posts.forEach((postn)=> {
            output += `<li>${postn.title}</li>`
        });
        document.body.innerHTML = output;
}

let preCreate = async() => {

    function createPost(post){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                posts.push({...post,createdAt:new Date().getTime()});
                const error = false;
                if(!error){
                    resolve('created sucessfully');
                }else{
                    reject('Error: something went wrong');
                }
            },5000)    
        });
    }
    
    function deletePost(){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(posts.length != 0){
                    posts.pop();
                    resolve('deleted sucessfully');
                }
                else
                {
                    reject('Error: No Posts to remove')
                }
            },1000)
        });
    }
    let createPromise = await createPost({title: 'Post three', body: 'This is post Three' });
    getPosts(); 
    console.log(createPromise);
    let deletePost3 = await deletePost() ;
    getPosts(); 
    let deletePost2 = await deletePost();
    getPosts(); 
    let deletePost1 = await deletePost();
    getPosts(); 
    let deletePost0 = await deletePost();
    // console.log(deletePost1);
    return deletePost0;
}

preCreate()
.then((m)=>console.log(m))
.catch((e)=>console.log(e));