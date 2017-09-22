let els = []
for (var i = 1; i < 9; i++) {
  for (var j = 1; j < i; j++) {
    if (i % (j + 1) === 0) {
      els.push({ 
        data: { id: String(1 / i) + String(1 / j), source: '1/' + i, target: '1/' + j } 
      })
    }
  }

  els.push({
    data: { id: '1/' + i, num: 1 / i, prevVal: null }
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
        'label': (ele) => String(ele.data('num') * 100).slice(0, 4) + '%'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'curve-style': 'bezier',
        'line-color': '#777',
        'target-arrow-color': '#777',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'circle',
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
