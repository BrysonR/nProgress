;(function () {
    function initializeCloseButtons () {
        $('.close-icon').click(function () {
            var projectToRemove = $(this).parent();
            removeProject(projectToRemove);
            saveSettings();
        });
    }

    function saveSettings () {
        var cards = [];
        var projectsList = $('.project-card');


        $('.project-card').each(function (index, card) {
            if (projectsList.length <= 1) return;

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

        chrome.storage.sync.get(function (data) {
            if (data.projects === undefined) return;
            var projects = data.projects;

            console.log(projects);

                data.projects.forEach(function (project) {
                    $(projectsList).append(window.clonedCard);
                });

            data.projects.forEach(function (project, index) {
                $('.project-card').each(function (index, card) {
                    if (index < data.projects.length) {
                        $($(card).children()[1]).children()[1].value = project.projectName;
                        $($(card).children()[2]).children()[1].value = project.urlPattern;
                    }

                });

            });

            initializeCloseButtons();
        });
    }

    function removeProject (project) {
        project.remove();

        var projectsList = $('.projects-list');
        $(projectsList).append(window.clonedCard);
    }

    $(function () {
        var projectCard = $('.project-card')[0]
        window.clonedCard = $(projectCard).clone();
        loadSettings();
        $('#save').click(function () {
            saveSettings();
        });
    });
})();
