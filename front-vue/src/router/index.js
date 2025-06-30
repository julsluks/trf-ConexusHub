import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/index.js'
import { getServiceStatus } from '@/services/communicationsScripts/servicesManager';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/students',
      name: 'student',
      component: () => import('@/views/Students/index.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['Estudiant'],
      },
      children: [
        {
          path: 'panel',
          name: 'student-panel',
          component: () => import('@/views/Students/panel.vue')
        },
        {
          path: 'inscriptions',
          name: 'student-inscriptions',
          component: () => import('@/views/Students/courses.vue')
        },
        {
          path: 'incidents',
          name: 'student-incidents',
          component: () => import('@/views/Incidents/index.vue')
        },
        {
          path: 'assistence',
          name: 'student-assistence',
          component: () => import('@/views/Students/courseSelectorAttendance.vue')
        },
        {
          path: 'grades',
          name: 'student-grades',
          component: () => import('@/views/Students/courseSelectorGrades.vue')
        },
        {
          path: ':id/grades',
          name: 'grades-from-course-student',
          component: () => import('@/views/Students/grades.vue'),
        },
        {
          path: ':id/assistence',
          name: 'assistence-from-course-student',
          component: () => import('@/views/Students/assistence.vue'),
        },
      ]
    },

    {
      path: '/teachers',
      name: 'teacher',
      component: () => import('@/views/Teachers/index.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['Professor'],
      },
      children: [
        {
          path: 'panel',
          name: 'teacher-panel',
          component: () => import('@/views/Teachers/panel.vue')
        },
        {
          path: 'inscription',
          name: 'teacher-inscriptions',
          component: () => import('@/views/Teachers/courses.vue')
        },
        {
          path: 'departments',
          name: 'teacher-departments',
          component: () => import('@/views/Teachers/departments.vue')
        },
        {
          path: 'canteen',
          name: 'teacher-canteen',
          component: () => import('@/views/Teachers/canteen.vue')
        },
        {
          path: 'chats',
          name: 'chats-list',
          component: () => import('@/views/Chats/ChatListView.vue')
        },
        {
          path: 'chats/:chatId',
          name: 'chat-detail',
          component: () => import('@/views/Chats/ChatDetailView.vue')
        },
        {
          path: 'incidents',
          name: 'teacher-incidents',
          component: () => import('@/views/Incidents/index.vue')
        },
        {
          path: 'lost-objects',
          name: 'teacher-lost-objects',
          component: () => import('@/views/Teachers/lost-objects.vue')
        },
        {
          path: 'lost-objects/:id/responses',
          name: 'teacher-lost-object-responses',
          component: () => import('@/views/LostObjects/responses.vue')
        },
        {
          path: 'assistence',
          name: 'teacher-assistence',
          component: () => import('@/views/Teachers/myCourses.vue')
        },
        {
          path: 'attendance/:courseId',
          name: 'attendance',
          component: () => import('../views/Teachers/Attendance/AttendanceView.vue'),
        },
        {
          path: 'grades',
          name: 'teacher-grades',
          component: () => import('@/views/Teachers/myCourses.vue')
        },
        {
          path: 'grades/:courseId',
          name: 'grades',
          component: () => import('../views/Teachers/Grades/GradesView.vue'),
        },
        {
          path: "grades/:courseId/CreateTask",
          name: "createTask",
          component: () => import('../views/Teachers/Grades/NewTask.vue'),
        },
        {
          path: "grades/:courseId/Task/:taskId",
          name: "evaluate",
          component: () => import('../views/Teachers/Grades/EvaluateTask.vue'),
        },
        {
          path: 'roomReservation',
          name: 'teacher-roomReservation',
          component: () => import('@/views/Teachers/roomReservation.vue')
        }
      ]
    },
    {
      path: '/technicians',
      name: 'technicians',
      component: () => import('@/views/Technicians/index.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['Tècnic'],
      },
      children: [
        {
          path: 'panel',
          name: 'technicians-panel',
          component: () => import('@/views/Technicians/panel.vue'),
        },
        {
          path: 'analysis',
          name: 'technicians-analysis',
          component: () => import('@/views/Technicians/analysis.vue')
        },
        {
          path: 'canteen',
          name: 'technician-canteen',
          component: () => import('@/views/Technicians/canteen.vue')
        },
        {
          path: 'chats',
          name: 'technician-chats-list',
          component: () => import('@/views/Chats/ChatListView.vue')
        },
        {
          path: 'chats/:chatId',
          name: 'technician-chat-detail',
          component: () => import('@/views/Chats/ChatDetailView.vue')
        },
        {
          path: 'incidents',
          name: 'technician-incidents',
          component: () => import('@/views/Technicians/incidents.vue')
        },
        {
          path: 'lost-objects',
          name: 'technician-lost-objects',
          component: () => import('@/views/Technicians/lost-objects.vue')
        },
        {
          path: 'lost-objects/:id/responses',
          name: 'technician-lost-object-responses',
          component: () => import('@/views/LostObjects/responses.vue')
        },
        {
          path: 'assignations',
          name: 'technician-assignations',
          component: () => import('@/views/Incidents/assignations.vue')
        },
        {
          path: 'solutions',
          name: 'technician-solutions',
          component: () => import('@/views/Incidents/solutions.vue')
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/index.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['Administrador'],
      },
      children: [
        {
          path: 'panel',
          name: 'admin-panel',
          component: () => import('@/views/Admin/panel.vue')
        },
        {
          path: 'config-users',
          name: 'admin-config-users',
          component: () => import('@/views/Admin/users.vue')
        },
        {
          path: 'config-departments',
          name: 'admin-config-departments',
          component: () => import('@/views/Admin/departments.vue')
        },
        {
          path: 'config-rooms',
          name: 'admin-config-rooms',
          component: () => import('@/views/Admin/rooms.vue')
        },
        {
          path: 'config-servers',
          name: 'admin-config-servers',
          component: () => import('@/views/Admin/servers.vue')
        },
        {
          path: 'config-lost-objects',
          name: 'admin-config-lost-objects',
          component: () => import('@/views/Admin/lost-objects.vue')
        },
        {
          path: 'config-lost-objects/:id/responses',
          name: 'admin-config-lost-object-responses',
          component: () => import('@/views/LostObjects/responses.vue')
        },
        {
          path: 'config-incidents',
          name: 'admin-config-incidents',
          component: () => import('@/views/Admin/incidents.vue')
        },
        {
          name: "new-room",
          path: 'new-room',
          component: () => import('@/views/Admin/newRoom.vue')
        },
        {
          name: "config-courses",
          path: "config-courses",
          component: () => import('@/views/Admin/courses.vue')
        }
      ]
    },
    {
      path: '/canteen',
      name: 'canteen',
      component: () => import('@/views/Canteen/index.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['Cantina'],
      },
      children: [
        {
          path: 'panel',
          name: 'canteen-panel',
          component: () => import('@/views/Canteen/panel.vue')
        },
        {
          path: 'chat',
          name: 'canteen-chat',
          component: () => import('@/views/Canteen/chatSimple.vue')
        },
        {
          path: 'menu-admin',
          name: 'canteen-menu-admin',
          component: () => import('@/views/Canteen/menuAdmin.vue')
        }
      ]
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/errors/Unauthorized.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFound.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: () => import('@/views/errors/Maintenance.vue'),
      meta: {
        requiresAuth: false
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  const isAuthenticated = !!store.getAccessToken();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  if (isAuthenticated && to.meta.allowedRoles && to.meta.allowedRoles.length > 0) {
    const user = store.getUser();

    let userRole = '';

    if (!user || Object.keys(user).length === 0) {
      store.clearAuthData();
      next({ name: 'home' });
      return;
    }

    if (user?.typeusers?.name) {
      userRole = user.typeusers.name;
    } else if (user?.typeUsers_id) {
      switch (Number(user.typeUsers_id)) {
        case 1: userRole = 'Professor'; break;
        case 2: userRole = 'Estudiant'; break;
        case 3: userRole = 'Administrador'; break;
        case 4: userRole = 'Tècnic'; break;
        case 5: userRole = 'Cantina'; break;
      }
    }


    const hasPermission = to.meta.allowedRoles.includes(userRole);


    if (!hasPermission) {

      next({ name: 'Unauthorized' });
      return;
    }
  }
  next();
});

// Añadir este interceptor después del interceptor de autenticación existente
router.beforeEach(async (to, from, next) => {
  // Ignorar verificación para página de mantenimiento y login
  if (to.name === 'Maintenance' || to.name === 'home' || to.path === '/') {
    return next();
  }

  try {
    let serviceToCheck = null;

    if (to.path.includes('/canteen') || to.path.includes('/menu-admin')) {
      serviceToCheck = 'canteen';
    } else if (to.path.includes('/chats') || to.path.includes('/chat') || to.path.includes('/canteen/chat')) {
      serviceToCheck = 'chat';
    } else if (to.path.includes('/lost-objects') || to.path.includes('/config-lost-objects')) {
      serviceToCheck = 'lostObjects';
    } else if (to.path.includes('/incidents') || to.path.includes('/assignations') ||
      to.path.includes('/solutions') || to.path.includes('/config-incidents')) {
      serviceToCheck = 'incidents';
    } else if (to.path.includes('/assistence')) {
      serviceToCheck = 'assistences';
    } else if (to.path.includes('/grades')) {
      serviceToCheck = 'grades';
    } else if (to.path.includes('/roomReservation') || to.path.includes('/config-rooms') ||
      to.path.includes('/new-room')) {
      serviceToCheck = 'rooms';
    }

    // Si no hay servicio específico que verificar para esta ruta, continuar
    if (!serviceToCheck) {
      return next();
    }

    // Verificar estado del servicio
    const serviceStatus = await getServiceStatus(serviceToCheck);

    if (!serviceStatus || serviceStatus.state !== 'running') {
      // Redireccionar a página de mantenimiento con información sobre el servicio
      return next({
        name: 'Maintenance',
        params: { service: serviceToCheck }
      });
    }

    next();
  } catch (error) {
    // En caso de error de conexión, también redirigir a mantenimiento
    next({ name: 'Maintenance' });
  }
});

export default router
