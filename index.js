let els = []
for (var i = 1; i < 9; i++) {
  for (var j = 1; j < i; j++) {
    if (i % (j + 1) === 0) {
      els.push({ 
        data: { id: String(i) + String(j), source: i, target: j } 
      })
    }
  }

  els.push({
    data: { id: i, num: 1 / i, prevVal: null }
  })
}

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: els,
  style: [
    {
      selector: 'node',
      style: {
        'background-color': 'mapData(num, 0, 1, black, lightgreen)',
        'label': (ele) => {
          var prob = String(ele.data('num') * 100).slice(0, 4)
          return `${ele.data('id')}: ${prob}%`
        }
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
    fit: true,
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

let selectedNode;

cy.on('tap', 'node', function(evt){
  selectedNode = evt.target;
  $('#editPanel').toggleClass('hiddenPanel')  
  $('#cyContainer').toggleClass('col-md-12')    
  $('#cyContainer').toggleClass('col-md-10')      
  $('#editPanel > h3').text(selectedNode.data('id'))
});