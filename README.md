# JSONblog
A JSONblog made to display my DOM manipulation abilities.

# Update
Post display and searching is available. Overlay has been finished code-wise.

# TODO
- things:
    -store all colours, search settings etc. into a config.json that is loaded when the document loads
        + store all file sources and such into config.json as well
    -add a bool called "online" that makes the json data either get saved locally or fetch/post to a server
    -make this a chrome extension, write up a course for it, make a twitter/linkedin/everything else account and publish it on it


- coding:
    -add post addition function (optimally by changing the server file)
    -fix datesorting to use proper bubblesort (right now its broken and wont work on more than two elements)
        -use the sort function instead? (FIX SORT!!)
    -add a link to full post pages which is previewed in the overlay using an iframe

- style:
    -style page
    -add 3 colour variables which the user can select to change site theme
    -add modes of display like post grids, carousels etc. + header or even sidebar to select them
    -implement full overlay (w/styling)
