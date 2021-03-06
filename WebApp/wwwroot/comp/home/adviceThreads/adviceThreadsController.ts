﻿module App {
    "use strict";

    interface IAdviceThreadsControllerScope extends ng.IScope {
        title: string;
    }

    interface IAdviceThreadsController {
        projects: Models.IProject[];
        selectedProject: Models.IProject;
        formTemplates: Models.IFormTemplate[];
        surveys: Models.ISurvey[];
        activate: () => void;
    }

    export interface IProjectStateParamsService extends ng.ui.IStateParamsService {
        project: Models.IProject;
    }

    class AdviceThreadsController implements IAdviceThreadsController {
        public selectedProject: Models.IProject;
        formTemplates: Models.IFormTemplate[];
        projects: Models.IProject[];
        surveys: Models.ISurvey[];

        static $inject: string[] = ['$scope', '$stateParams', '$state', 'toastr', 'projectResource', 'formTemplateResource', 'surveyResource'];

        constructor(
            private $scope: IAdviceThreadsControllerScope,
            private $stateParams: IProjectStateParamsService,
            private $state: ng.ui.IStateService,
            private toastr: any,
            private projectResource: Resources.IProjectResource,
            private formTemplateResource: Resources.IFormTemplateResource,
            private surveyResource: Resources.ISurveyResource) {

            this.activate();
        }

        activate() {
            this.$scope.title = 'Advice Threads';

            this.$scope.$on('$stateChangeSuccess', (args) => {
                this.load();
            });
        }

        load() {
            this.projectResource.query().$promise.then((projects) => {
                this.projects = projects;

                if (this.projects.length < 1)
                    this.selectedProject = null;
                else {
                    var projectId = this.$state.params['projectId'];
                    if (projectId !== undefined && projectId.length) {
                        this.selectedProject = _.find(this.projects, { id: projectId });
                    } else {
                        if (this.projects.length === 1) {
                            this.selectedProject = this.projects[0];
                            this.selectedProjectChanged();
                        }
                    }
                }
            }, (error) => {
                console.error(error);
            });
        }

        selectedProjectChanged() {
            if (this.selectedProject) {
                //if (this.$state.current.name === 'home.adviceThreads.list.all')
                //    this.$state.go("home.adviceThreads.list.all", { projectId: this.selectedProject.id }, { reload: true });
                //else
                //    this.$state.go("home.adviceThreads.list.summary", { projectId: this.selectedProject.id }, { reload: true });

                this.$state.go("home.adviceThreads.list.summary", { projectId: this.selectedProject.id }, { reload: true });
            }
        }

    }

    angular.module("app").controller("adviceThreadsController", AdviceThreadsController);
}