let els = []
for (var i = 1; i < 7; i++) {
  for (var j = 1; j < i; j++) {
    if (i % (j + 1) === 0) {
      els.push({ 
        data: { id: String(i) + String(j), source: String(i), target: String(j) } 
      })
    }
  }

  els.push({
    data: { id: i, nums: [i], prevVal: null }
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
        'label': 'data(nums)'
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
  startNode.data('nums', newVal)

  cyto.elements().bfs({
    root: startNode,
    visit: function(node, edgeTraversed, prevNode, index){

      var len = node.data('nums').length
      const prevNodeOldVal = node.data('prevVal')[len - 1] 

      console.log(node.data('nums'), prevNodeOldVal)

      func(node, edgeTraversed, prevNode, prevNodeOldVal)
    },
    directed: true
  })
}

function update(node, edgeTraversed, prevNode, prevNodeOldVal) {
  const oldVal = node.data('nums')
  node.data('nums', index > 0 ? oldVal.concat(prevNodeOldVal) : oldVal)
}

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  propagateFn(cy, node, node.data('nums'), update)
});
function update(node, edgeTraversed, prevNode, prevNodeOldVal) {
  const oldVal = node.data('nums')
  node.data('nums', index > 0 ? oldVal.concat(prevNodeOldVal) : oldVal)
}

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  propagateFn(cy, node, node.data('nums'), update)
});
