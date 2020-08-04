
/*Functions*/

/*loadJSON*/ 
function loadJSON(filesource,callback,callbackparams) {
    //the function calls back any function entered, the callbackparams variable contains any potential parameters said function might additionally need
    fetch(filesource)
    .then(response => response.json())
    .then(data => {
      //if there is no callback the function simply returns the json data
      if (callback == undefined) return data;
      else callback(data,...callbackparams)
    });
  };
  
  /*loadPosts*/ 
  function loadPosts(data,displayid,overlayid) {
        let postdata = [];
        let postdisplay = document.getElementById(displayid);
        postdisplay.innerHTML="";
          //check if the user is sorting by oldest or most recent (true = oldest, false = most recent)
        for (let i=0; i < data.length; i++) {
        //loop through data and create an array of the various elements the page creates
        postdata[i] = {
            container : document.createElement("div"),
            thumbnail : document.createElement("img"),
            title : document.createElement("h1"),
            content : document.createElement("p"),
            tags : document.createElement("p"),
            date : document.createElement("p"),
            overlaybutton : document.createElement("button")        
        }
        //assign the elements their classes and ids
        postdata[i].container.className = "post-container";
        postdata[i].title.className = "post-title";
        postdata[i].thumbnail.className = "post-thumb";
        postdata[i].content.className = "post-content";
        postdata[i].tags.className = "post-tags";
        postdata[i].date.className = "post-date";
  
        postdata[i].container.id = "post-" + i + "-container";
        postdata[i].title.id = "post-"+ i +"-title";
        postdata[i].thumbnail.id = "post-"+ i +"-thumb";
        postdata[i].content.id = "post-"+ i +"-content";
        postdata[i].tags.id = "post-"+ i +"-tags";
        postdata[i].date.id = "post-"+ i +"-date";
        //fill the elements with appropriate content
        postdata[i].title.innerHTML = data[i].title;
        postdata[i].thumbnail.src = data[i].thumbnail;
        postdata[i].content.innerHTML = data[i].content;
        postdata[i].date.innerHTML = data[i].date.year + "." + data[i].date.month + "." + data[i].date.day;
        
        for (let j=0; j<data[i].tags.length;j++) {
        postdata[i].tags.innerHTML += data[i].tags[j];
        if (j != data[i].tags.length-1) postdata[i].tags.innerHTML += ", ";
        }
        //create and fill up the overlay button
        postdata[i].overlaybutton.id = "post-"+ i +"-overlaybutton";
        postdata[i].date.className = "post-overlaybutton";
        postdata[i].overlaybutton.innerHTML = "Read more";
        postdata[i].overlaybutton.setAttribute('onclick','OverlayPost(\''+overlayid+'\','+i+')');
        //add the elements to the container
        postdata[i].container.appendChild(postdata[i].title);
        postdata[i].container.appendChild(postdata[i].thumbnail);
        postdata[i].container.appendChild(postdata[i].content);
        postdata[i].container.appendChild(postdata[i].tags);
        postdata[i].container.appendChild(postdata[i].date);
        postdata[i].container.appendChild(postdata[i].overlaybutton);
        //append the elements to the display
        postdisplay.appendChild(postdata[i].container);
      }
  }
  
  function overlayPost(overlayid, postid) {
      let postdata = {
        title: document.getElementById("post-"+postid+"-title"),
        thumbnail: document.getElementById("post-"+postid+"-thumb"),
        contents: document.getElementById("post-"+postid+"-content"),
        tags: document.getElementById("post-"+postid+"-tags"),
        date: document.getElementById("post-"+postid+"-date"),
      }
      let overlay = {
        container: document.getElementById(overlayid),
        title: document.createElement('h1'),
        thumbnail: document.createElement('img'),
        contents: document.createElement('p'),
        tags: document.createElement('p'),
        date: document.createElement('p')
      };
      
      overlay.container.innerHTML = "";
  
      overlay.title.innerHTML= postdata.title.innerHTML;
      overlay.thumbnail.src = postdata.thumbnail.src;
      overlay.contents.innerHTML = postdata.contents.innerHTML;
      overlay.tags.innerHTML = postdata.tags.innerHTML;
      overlay.date.innerHTML = postdata.date.innerHTML;
  
      overlay.container.appendChild(overlay.title);
      overlay.container.appendChild(overlay.thumbnail);
      overlay.container.appendChild(overlay.contents);
      overlay.container.appendChild(overlay.tags);
      overlay.container.appendChild(overlay.date);
  }
  
  /*search()*/
  function search(data,callback,callbackparams,search) {
    let newdata = [];
    for (let i=0; i<data.length; i++) {
        if (data[i].title.includes(search) ||
            data[i].content.includes(search) ||
            data[i].tags.includes(search) ||
            data[i].date.year.toString() == search ||
            data[i].date.year.toString() == search ||
            data[i].date.day.toString() == search
        ) {
          newdata.push(data[i]);
        }
      }

    if (callback == undefined) return newdata;
    else callback(newdata,...callbackparams);
  }
  
  /*sortByDate()*/ 
  function sortByDate(data,callback,callbackparams,sorttype) {
    console.log(sorttype);
    
    recentfunction = function(a,b) {
      if (a.date.year <= b.date.year && a.date.month <= b.date.month && a.date.day <= b.date.day) return 1;
      else return -1;
    }

    oldestfunction = function(a,b) {
      if (a.date.year >= b.date.year && a.date.month >= b.date.month && a.date.day >= b.date.day) return 1;
      else return -1;
    }

    if (sorttype = 'recent') {
        if (callback == undefined) return data.sort(sortfunction);
        else return callback(data.sort(recentfunction),...callbackparams)
    }
    if (sorttype = 'oldest') {
      if (callback == undefined) return data.sort(oldestfunction);
      else return callback(data.sort(oldestfunction),...callbackparams)
    }
}
  
  /*function for creating posts and saving them to .json*/
  
  function post(filesource,postdata) {
  const data = { username: 'example' };
  
  fetch('name.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  //argument binding for search functions
  Function.prototype.bindArgs = //works on any function
    function (...boundArgs) //get arguments to bind
    {
        const targetFunction = this; //set the target function to the function using this method
        return function (...args) { return targetFunction.call(this, ...boundArgs, ...args); }; //create a new function using the bound arguments that appends the other arguments entered
    };