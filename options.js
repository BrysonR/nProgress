;(function () {
    function initializeCloseButtons () {
        $('.close-icon').click(function () {
            var projectToRemove = $(this).parent();
            removeProject(projectToRemove);
        });
    }

    function saveSettings () {
        var cards = [];

        $('.project-card').each(function (index, card) {
            var cardToSave = {};

            cardToSave.projectName = $($(card).children()[1]).children()[1].value;
            cardToSave.urlPattern = $($(card).children()[2]).children()[1].value;

            cards.push(cardToSave);
        });

        chrome.storage.sync.set({projects: cards}, function () {
            console.log('Saved the following projects: %O', cards);
        });
    }

    function loadSettings () {
        var projectsList = $('.projects-list');
        var projectCard = $('.project-card')[0]
        var clonedCard = $(projectCard).clone();

        chrome.storage.sync.get(function (data) {
            if (data.projects === undefined) return;
            var projects = data.projects;

            console.log(projects);

            if (data.projects.length > 1) {
                data.projects.forEach(function (project) {
                    $(projectsList).append(clonedCard);
                });
            }

            data.projects.forEach(function (project) {
                $('.project-card').each(function (index, card) {
                    $($(card).children()[1]).children()[1].value = project.projectName;
                    $($(card).children()[2]).children()[1].value = project.urlPattern;
                });
            });

            initializeCloseButtons();
        });
    }

    function removeProject (project) {
        project.remove();
    }

    $(function () {
        loadSettings();
        $('#save').click(function () {
            saveSettings();
        });
    });
})();
