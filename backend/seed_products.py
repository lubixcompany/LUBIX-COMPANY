import sys
sys.path.insert(0, '.')
from app.database.Connection import SessionLocal
from app.models.ModelProduct import Product, Catalog
from app.models.ModelCompany import Company
from app.models.ModelUser import Users

db = SessionLocal()

company = db.query(Company).first()
if not company:
    user = db.query(Users).first()
    if user:
        company = Company(
            nameCompany='Lubix Store',
            addressCompany='Calle 123',
            CompanyNIT='900123456',
            CompanyNITDV='6',
            user_id=user.id
        )
        db.add(company)
        db.commit()
        db.refresh(company)
        print(f'Company creada: {company.id}')
    else:
        print('No hay users, creando company sin user...')
        user = Users(
            fullName='Admin',
            email='admin@lubix.com',
            tell='3001234567',
            password_hash='placeholder'
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        company = Company(
            nameCompany='Lubix Store',
            addressCompany='Calle 123',
            CompanyNIT='900123456',
            CompanyNITDV='6',
            user_id=user.id
        )
        db.add(company)
        db.commit()
        db.refresh(company)

catalogs = db.query(Catalog).all()
catalog_map = {c.name: c.id for c in catalogs}
print(f'Catalogs found: {list(catalog_map.keys())}')

products_data = [
    {
        'name': 'Smartphone Nova 12',
        'price': 2400000,
        'stock': 2,
        'desc': 'Pantalla AMOLED de 6.5 pulgadas, camara triple de 108MP, procesador octa-core de alta gama, bateria de 5000mAh con carga rapida de 65W. Diseno elegante con acabados premium.',
        'catalog': 'Celulares',
        'tech': {'Pantalla': 'AMOLED 6.5"', 'Camara': '108MP', 'Bateria': '5000mAh'}
    },
    {
        'name': 'Consola Gamer Vortex',
        'price': 2200000,
        'stock': 7,
        'desc': 'Consola de ultima generacion con graficos 4K, SSD ultrarapido de 1TB, control inalambrico con feedback.',
        'catalog': 'Gaming',
        'tech': {'GPU': '4K HDR', 'Almacenamiento': '1TB SSD'}
    },
    {
        'name': 'Audifonos Pulse X',
        'price': 360000,
        'discount_enable': True,
        'discount_value': 15,
        'stock': 12,
        'desc': 'Audio inmersivo con cancelacion de ruido activa, Bluetooth 5.3, 30 horas de bateria y microfono con reduccion de ruido.',
        'catalog': 'Audio',
        'tech': {'Bluetooth': '5.3', 'Bateria': '30h', 'ANC': 'Si'}
    },
    {
        'name': 'Monitor UltraSharp 27',
        'price': 1850000,
        'stock': 5,
        'desc': 'Pantalla IPS 4K UHD con 99% sRGB, conectividad USB-C con carga de 90W, ajuste de altura y pivot.',
        'catalog': 'Computadoras',
        'tech': {'Resolucion': '4K UHD', 'Panel': 'IPS', 'Refresh': '60Hz'}
    },
    {
        'name': 'Teclado Mecanico Pro',
        'price': 420000,
        'discount_enable': True,
        'discount_value': 10,
        'stock': 9,
        'desc': 'Teclado mecanico RGB con switches tactiles, estructura de aluminio, reposamunecas magnetico.',
        'catalog': 'Computadoras',
        'tech': {'Switches': 'Tactiles', 'Conectividad': 'USB-C'}
    },
    {
        'name': 'TV OLED Vision 55',
        'price': 3200000,
        'stock': 4,
        'desc': 'Televisor OLED con contraste infinito, Dolby Vision IQ, sonido envolvente Dolby Atmos, 120Hz.',
        'catalog': 'Computadoras',
        'tech': {'Panel': 'OLED', 'Refresh': '120Hz', 'HDR': 'Dolby Vision'}
    },
    {
        'name': 'Samsung Galaxy S24 Ultra',
        'price': 5800000,
        'discount_enable': True,
        'discount_value': 8,
        'stock': 3,
        'desc': 'Pantalla Dynamic AMOLED 2X de 6.8 pulgadas, camara de 200MP, S Pen integrado y Galaxy AI.',
        'catalog': 'Celulares',
        'tech': {'Pantalla': '6.8" AMOLED', 'Camara': '200MP', 'RAM': '12GB'}
    },
    {
        'name': 'Camara Sony Alpha 7IV',
        'price': 8500000,
        'stock': 2,
        'desc': 'Camara mirrorless full-frame de 33MP, grabacion 4K 60fps, estabilizacion en cuerpo de 5 ejes.',
        'catalog': 'C\u00f3maras',
        'tech': {'Sensor': '33MP Full-Frame', 'Video': '4K 60fps', 'ISO': '100-51200'}
    },
    {
        'name': 'Audifonos Sony WH-1000XM5',
        'price': 1200000,
        'discount_enable': True,
        'discount_value': 12,
        'stock': 10,
        'desc': 'Cancelacion de ruido lider en la industria, 30 horas de bateria, calidad de audio Hi-Res y diseno plegable.',
        'catalog': 'Audio',
        'tech': {'ANC': 'Lider', 'Bateria': '30h', 'Codec': 'LDAC'}
    },
    {
        'name': 'Smartwatch FitPro X',
        'price': 580000,
        'stock': 15,
        'desc': 'Reloj inteligente con GPS dual, monitor cardiaco 24/7, 7 dias de bateria y resistencia IP68.',
        'catalog': 'Reloj inteligente',
        'tech': {'GPS': 'Dual', 'Bateria': '7 dias', 'Resistencia': 'IP68'}
    },
    {
        'name': 'PlayStation 5 Slim',
        'price': 2100000,
        'stock': 8,
        'desc': 'Consola delgada con SSD de 1TB, ray tracing, 4K a 120fps y retro compatible.',
        'catalog': 'Gaming',
        'tech': {'Almacenamiento': '1TB SSD', 'Resolucion': '4K 120fps'}
    },
    {
        'name': 'MacBook Air M3',
        'price': 6500000,
        'stock': 6,
        'desc': 'Chip M3, pantalla Liquid Retina de 15.3 pulgadas, 18 horas de bateria, diseno ultradelgado.',
        'catalog': 'Computadoras',
        'tech': {'Chip': 'M3', 'Pantalla': '15.3" Retina', 'RAM': '8GB'}
    },
]

for p in products_data:
    cat_id = catalog_map.get(p['catalog'])
    if not cat_id:
        print(f'Catalogo "{p["catalog"]}" no encontrado, saltando...')
        continue
    product = Product(
        name=p['name'],
        price=p['price'],
        images=[],
        discount_enable=p.get('discount_enable', False),
        discount_value=p.get('discount_value', 0),
        stock=p['stock'],
        descripcion=p['desc'],
        technical_spec=p.get('tech', {}),
        company_id=company.id,
        catalog_id=cat_id
    )
    db.add(product)
    print(f'Agregado: {p["name"]}')

db.commit()
print('\nTodos los productos insertados exitosamente!')
db.close()
