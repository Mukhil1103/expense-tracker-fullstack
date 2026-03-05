from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from datetime import datetime

from .models import Category, Expense
from .serializers import CategorySerializer, ExpenseSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def monthly_total(self, request):
        now = datetime.now()
        current_month = now.month
        current_year = now.year

        total = Expense.objects.filter(
            date__month=current_month,
            date__year=current_year
        ).aggregate(total_amount=Sum('amount'))

        return Response({
            "month": current_month,
            "year": current_year,
            "total": total["total_amount"] or 0
        })