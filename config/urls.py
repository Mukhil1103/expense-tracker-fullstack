from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse

from expenses.views import CategoryViewSet, ExpenseViewSet


# Router for API endpoints
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'expenses', ExpenseViewSet, basename='expense')


# Root API health check
def home(request):
    return JsonResponse({
        "message": "Expense Tracker API is running 🚀",
        "admin": "/admin/",
        "api": "/api/",
        "login": "/api/token/"
    })


urlpatterns = [
    # Home route
    path('', home),

    # Admin panel
    path('admin/', admin.site.urls),

    # API routes
    path('api/', include(router.urls)),

    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]