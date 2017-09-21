let els = []
for (var i = 1; i < 7; i++) {
  for (var j = 0; j < i; j++) {
    if (i % j === 1) {
      els.push({ data: { id: String(i) + String(j), source: String(i), target: String(j) } })
    }
  }

  els.push({
    data: { id: i, num: i }
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
  startNode.data('num', newVal)

  cyto.elements().bfs({
    root: startNode,
    visit: func,
    directed: true
  })
}

function update(node, edgeTraversed, nodeFrom) {
  const oldVal = node.data('num')
  node.data('num', nodeFrom ? oldVal + nodeFrom.data('num') : oldVal)
}

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  propagateFn(cy, node, node.data('num'), update)
});