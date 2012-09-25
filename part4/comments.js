window.onload = function(){
    // Party mode click listener
    document.getElementById("party").addEventListener('click', function(e) {
        e.target.parentNode.className = 'flash';
    }, false);
    
    // Party mode animation end listener
    document.addEventListener('animationend', function(e) {
        e.target.className = '';
    }, false);
}

function submitComment() {
    // Create nodes
    var comment = document.createElement('div');
    comment.className = 'commentHidden';
    var title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = 'You said:';
    var content = document.createElement('div');
    content.className = 'content';
    content.appendChild(document.createTextNode(document.getElementById('commentInput').value));
    
    // Connect nodes to parent
    comment.appendChild(title);
    comment.appendChild(content);
    
    comment.addEventListener('click', toggle('commentHidden', 'commentRevealed'), false);
    
    // Connect node to page
    document.getElementById('commentBody').appendChild(comment);
    
    // Clear textarea
    document.getElementById('commentInput').value = '';
}

// Curried toggle
function toggle(classA, classB) {
    return function(e) {
        if(e.target.parentNode.className === classA) {
            e.target.parentNode.className = classB;
        }
        else {
            e.target.parentNode.className = classA;
        }
    }
}

