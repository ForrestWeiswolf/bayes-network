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
        'label': (ele) => `${ele.data('id')}: ${displayProb(ele)}`
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
  startNode.data('prevVal', startNode.data('num'))
  startNode.data('num', newVal)
  console.log(startNode.data('prevVal'), startNode.data('num'))

  cyto.elements().bfs({
    root: startNode,
    visit: function (node, edgeTraversed, prevNode) {

      func(node, edgeTraversed, prevNode)
    },
    directed: true
  })
}

function update(node, edgeTraversed, prevNode) {
  node.data('prevVal', node.data('num'))
  node.data('num', prevNode ? prevNode.data('prevVal') : node.data('num'))
}

//edit functionality:

let selectedNode;

cy.on('tap', 'node', function (evt) {
  selectedNode = evt.target;

  extendPanel('#editPanel')

  $('#prior').text('Current value: ' + displayProb(selectedNode))
  $('#nodeName').text('Edit node: ' + selectedNode.data('id'))
});

$('#edit').click((event) => {
  event.preventDefault();

  var newVal = $('#probability').val() / 100
  propagateFn(cy, selectedNode, newVal, update)

  retractPanel('#editPanel')
  $('#probability').val('')
})

//add functionality

$('#addBtn').click(() => {
  extendPanel('#addPanel')
})

$('#create').click((event) => {
  event.preventDefault();

  cy.add({ data: {
    id: 0 + $('#nodeId').val(),
    num: 0 + $('#nodeProbability').val() / 100,
    prevVal: null
  }})

  retractPanel('#addPanel')
  $('#nodeId').val('')
  $('#nodeProbability').val('')  
})

//utility functions:

function displayProb(ele) {
  return String(ele.data('num') * 100).slice(0, 4) + '%'
}

function extendPanel(idOrClass){
  retractPanel('.panel')

  $(idOrClass).removeClass('hiddenPanel')
  $('#addBtn').addClass('hiddenPanel')
  $('#cyContainer').removeClass('col-md-12')
  $('#cyContainer').addClass('col-md-10')
}

function retractPanel(id){
  $(id).addClass('hiddenPanel')
  $('#addBtn').removeClass('hiddenPanel')
  $('#cyContainer').removeClass('col-md-10')
  $('#cyContainer').addClass('col-md-12')
}