from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from decimal import Decimal


class CompanyDashboardSchema(BaseModel):
    id: UUID
    nameCompany: str
    addressCompany: str
    CompanyNIT: str
    CompanyNITDV: str
    CompanyLogo: Optional[str] = None

    #conversion de ORM --> shema --> Json
    class Config:
        from_attributes = True



class ProductDashboardSchema(BaseModel):
    id: UUID
    name: str
    price: Decimal
    stock: Decimal
    discount_enable: bool

    class Config:
        from_attributes = True





#Response Dasboard
class DashboardSchema(BaseModel):
    company: CompanyDashboardSchema

    total_products: int
    total_stock: Decimal
    inventory_value: Decimal

    products_with_discount: int

    latest_products: List[ProductDashboardSchema]