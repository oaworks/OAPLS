document.addEventListener('DOMContentLoaded', function () {
  // Handle Choices.js for different pages
  if (document.getElementById('funderInput')) {
    var choices = new Choices('#funderInput', {
      removeItemButton: true,
      maxItemCount: 2,
      searchResultLimit: 5,
      renderChoiceLimit: 5,
      itemSelectText: '',
      shouldSort: false,
    });

    // Set choices based on the page context
    let choicesList = [];
    if (window.location.pathname.includes('bmgf-nih')) {
      choicesList = [
        {value: 'BMGF', label: 'Bill & Melinda Gates Foundation', selected: true, disabled: true},
        {value: 'NIH', label: 'National Institutes of Health', selected: true, disabled: true}
      ];
    } else if (window.location.pathname.includes('nih')) {
      choicesList = [
        {value: 'NIH', label: 'National Institutes of Health', selected: true, disabled: true},
        {value: 'BMGF', label: 'Bill & Melinda Gates Foundation', disabled: false}
      ];
    } else {
      choicesList = [
        {value: 'BMGF', label: 'Bill & Melinda Gates Foundation'},
        {value: 'NIH', label: 'National Institutes of Health'}
      ];
    }
    choices.setChoices(choicesList, 'value', 'label', false);

    document.getElementById('funderForm').onsubmit = function (event) {
      event.preventDefault();
      const values = choices.getValue(true);
      let targetUrl = '/';
      if (values.includes("BMGF") && values.includes("NIH")) {
        targetUrl = 'bmgf-nih';
      } else if (values.includes("BMGF")) {
        targetUrl = 'bmgf';
      } else if (values.includes("NIH")) {
        targetUrl = 'nih';
      }
      window.location.href = targetUrl;
    };
  }

  // Handle tab functionality on NIH and BMGF-NIH pages
  if (document.querySelector('#tab-list')) {
    const tabs = document.querySelectorAll('#tab-list a');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        tabs.forEach(t => t.classList.remove('bg-white', 'text-gray-800'));
        panes.forEach(p => p.classList.remove('active'));
        this.classList.add('bg-white', 'text-gray-800');
        document.getElementById(target).classList.add('active');
      });
    });
    tabs[0].classList.add('bg-white', 'text-gray-800');
    panes[0].classList.add('active');
  }
});
