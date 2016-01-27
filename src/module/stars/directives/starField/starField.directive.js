(function() {
    'use strict';

    angular
        .module('rp.stars')
        .directive('rpStarField', starFieldDirective);

    function starFieldDirective() {
        var directive = {
            link: link,
            scope: {
                data: '='
            },
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var camera, scene, renderer, clock, container, geometry, particles;
            var mouseX = 0, mouseY = 0, starsAdded = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            var renderHeight = windowHalfY;
            var renderWidth = element[0].parentNode.clientWidth;

            scope.$watch('data', function() {
                init();
                animate();
            });

            function init() {
                container = angular.element('<div />');
                element.append(container);

                camera = new THREE.PerspectiveCamera(75, renderWidth / renderHeight, 1, 3000);
                camera.position.z = 1000;

                scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2(0x000000, 0.0007);

                geometry = new THREE.Geometry();
                geometry.dynamic = true;

                for (var i = 0; i < scope.data['stargazers_count']; i++) {
                    var vertex = new THREE.Vector3();
                    vertex.x = Math.random() * 2000 - 1000;
                    vertex.y = Math.random() * 2000 - 1000;
                    vertex.z = Math.random() * 2000 - 1000;

                    geometry.vertices.push(vertex);
                }
                var loader = new THREE.TextureLoader();
                loader.load(
                    'assets/star.png',
                    function (texture) {
                        var material = new THREE.PointsMaterial({
                            size: 20,
                            map: texture,
                            blending: THREE.AdditiveBlending
                        });

                        particles = new THREE.Points(geometry, material);
                        particles.rotation.x = Math.random() * 6;
                        particles.rotation.y = Math.random() * 6;
                        particles.rotation.z = Math.random() * 6;

                        scene.add(particles);
                    },
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    function (xhr) {
                        console.log('An error happened');
                    }
                );

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(renderWidth, renderHeight);
                container.append(renderer.domElement);

                window.addEventListener('mousemove', onDocumentMouseMove, false);
                window.addEventListener('touchstart', onDocumentTouchStart, false);
                window.addEventListener('touchmove', onDocumentTouchMove, false);
                window.addEventListener('resize', onWindowResize, false);

            }

            function onWindowResize() {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                renderHeight = windowHalfY;
                renderWidth = element[0].parentNode.clientWidth;

                camera.aspect = renderWidth / renderHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(renderWidth, renderHeight);
            }

            function onDocumentMouseMove(event) {
                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
            }

            function onDocumentTouchStart(event) {
                if (event.touches.length === 1) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            function onDocumentTouchMove(event) {
                if (event.touches.length === 1) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            function render() {
                var time = Date.now() * 0.00005;
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

                for (var i = 0; i < scene.children.length; i ++) {
                    var object = scene.children[ i ];
                    if (object instanceof THREE.Points) {
                        object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
                    }
                }
                renderer.render(scene, camera);
            }

        }

    }
})();
