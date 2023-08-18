document.addEventListener('DOMContentLoaded', function () {
    const noteTextarea = document.getElementById('note');
    const saveButton = document.getElementById('saveButton');
  
    // Check if there's a stored note and update button action
    chrome.storage.sync.get(['notes'], function (result) {
      const notes = result.notes || [];
      if (notes.length > 0) {
        saveButton.textContent = 'Update Note';
        noteTextarea.value = notes[notes.length - 1];
      }
    });
  
    saveButton.addEventListener('click', function () {
      const note = noteTextarea.value.trim();
      if (note !== '') {
        chrome.storage.sync.get(['notes'], function (result) {
          const notes = result.notes || [];
          if (notes.length > 0) {
            notes[notes.length - 1] = note;
          } else {
            notes.push(note);
          }
          chrome.storage.sync.set({ notes: notes }, function () {
            noteTextarea.value = '';
            saveButton.textContent = 'Save Note'; // Reset button text
            alert('Note saved successfully!');
          });
        });
      }
    });
  });
  