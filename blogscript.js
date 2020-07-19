function LoadPosts(displayid, searchtags, searchtitle) {
  fetch('posts.json')
  .then(response => response.json())
  .then(data => {
      console.log(data)
      let postdata = [];
      let postdisplay = document.getElementById(displayid);
      postdisplay.innerHTML="";
      for (let i=0; i < data.length; i++) {
      if ((data[i].title.includes(searchtitle) &&
          searchtitle.length > 0) ||
          (data[i].tags.includes(searchtags) &&
          searchtags.length > 0) ||
          searchtags == undefined ||
          searchtitle == undefined) {
      //loop through data and create an array of the various elements the page creates
      postdata[i] = {
          container : document.createElement("div"),
          thumbnail : document.createElement("img"),
          title : document.createElement("h1"),
          content : document.createElement("p"),
          tags : document.createElement("p")        
      }
      //assign the elements their classes and ids
      postdata[i].container.className = "post-container";
      postdata[i].title.className = "post-title";
      postdata[i].thumbnail.className = "post-thumb";
      postdata[i].content.className = "post-content";
      postdata[i].tags.className = "post-tags";

      postdata[i].container.id = "post-" + i + "-container";
      postdata[i].title.id = "post-"+ i +"-title";
      postdata[i].thumbnail.id = "post-"+ i +"-thumb";
      postdata[i].content.id = "post-"+ i +"-content";
      postdata[i].tags.id = "post-"+ i +"-tags";
      //fill the elements with appropriate content
      postdata[i].title.innerHTML = data[i].title;
      postdata[i].thumbnail.src = data[i].thumbnail;
      postdata[i].content.innerHTML = data[i].content;
      postdata[i].tags.innerHTML = data[i].tags;

      postdata[i].container.appendChild(postdata[i].title);
      postdata[i].container.appendChild(postdata[i].thumbnail);
      postdata[i].container.appendChild(postdata[i].content);
      postdata[i].container.appendChild(postdata[i].tags);
      //append the elements to the display
      postdisplay.appendChild(postdata[i].container);
    }
    }
})};