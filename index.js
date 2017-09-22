let els = []
for (var i = 1; i < 7; i++) {
  for (var j = 1; j < i; j++) {
    if (i % j === 1) {
      els.push({ 
        data: { id: String(i) + String(j), source: String(i), target: String(j) } 
      })
    }
  }

  els.push({
    data: { id: i, num: i, prevVal: null }
  })
}

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: els,
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#555',
        'label': 'data(num)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'curve-style': 'bezier',
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'breadthfirst',
    rows: 3,
    directed: true
  }
});

function propagateFn(cyto, startNode, newVal, func) {
  // startNode.data('prevVal', startNode.data('num'))
  // startNode.data('num', newVal)
  // console.log(startNode.data('prevVal'), startNode.data('num'))

  cyto.elements().bfs({
    root: startNode,
    visit: function(node, edgeTraversed, prevNode){
      
      func(node, edgeTraversed, prevNode)
    },
    directed: true
  })
}

function update(node, edgeTraversed, prevNode) {
  node.data('prevVal', node.data('num'))
  node.data('num', prevNode ? prevNode.data('prevVal') : node.data('num'))
}

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  propagateFn(cy, node, 1, update)
});
