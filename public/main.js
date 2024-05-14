document.addEventListener('DOMContentLoaded', function () {
  // Initialize Choices.js for various selects
  const documentTypeSelect = document.getElementById('documentType');
  const grantIDsSelect = document.getElementById('grantIDs');
  const submissionDateSelect = document.getElementById('submissionDate');

  if (documentTypeSelect) {
    var documentTypeChoices = new Choices(documentTypeSelect, {
      removeItemButton: true,
      maxItemCount: 3,
      searchResultLimit: 5,
      renderChoiceLimit: 5,
      itemSelectText: '',
      shouldSort: false
    });
    documentTypeChoices.setChoices([
      {value: 'Peer-reviewed original research', label: 'Peer-reviewed original research', selected: true},
      {value: 'Genomic data', label: 'Genomic data'},
      {value: 'Data supporting publications', label: 'Data supporting publications'}
    ], 'value', 'label', false);
  }

  if (grantIDsSelect) {
    var grantIDsChoices = new Choices(grantIDsSelect, {
      removeItemButton: true,
      maxItemCount: 2,
      searchResultLimit: 5,
      renderChoiceLimit: 5,
      itemSelectText: '',
      shouldSort: false
    });
    grantIDsChoices.setChoices([
      {value: 'INV-123456', label: 'INV-123456 (Bill & Melinda Gates Foundation)'},
      {value: '1-R01-NHGRI99999-20A1', label: '1-R01-NHGRI99999-20A1 (National Institutes of Health)'}
    ], 'value', 'label', false);
  }

  if (submissionDateSelect) {
    var submissionDateChoices = new Choices(submissionDateSelect, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false
    });
    submissionDateChoices.setChoices([
      {value: '12 January 2024', label: '12 January 2024', selected: true}
    ], 'value', 'label', false);
  }

  // Handle form submission
  const form = document.getElementById('funderForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const grantIds = grantIDsChoices.getValue(true).map(choice => choice.value);

      // Simple redirection logic
      if (grantIds.length === 2) {
        window.location.href = '/bmgf-nih';
      } else {
        window.location.href = '/bmgf';
      }
    });
  }

  // Tab functionality for pages with tabbed content
  const tabList = document.querySelector('#tab-list');
  if (tabList) {
    const tabs = tabList.querySelectorAll('a');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');

        tabs.forEach(t => {
          t.classList.remove('bg-white', 'text-gray-800');
          t.parentElement.classList.remove('active'); // Remove active from parent li if applicable
        });

        panes.forEach(p => {
          p.classList.remove('active');
          p.classList.add('hidden');
        });

        this.classList.add('bg-white', 'text-gray-800');
        this.parentElement.classList.add('active'); // Add active to parent li if applicable
        document.getElementById(target).classList.add('active');
        document.getElementById(target).classList.remove('hidden');
      });
    });

    // Activate the first tab and pane by default if not already active
    if (!tabs[0].parentElement.classList.contains('active')) {
      tabs[0].click();
    }
  }
});
