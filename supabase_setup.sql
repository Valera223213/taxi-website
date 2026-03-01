-- Create the routes table
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    distance TEXT,
    time TEXT,
    image_url TEXT,
    prices JSONB DEFAULT '{"economy": 0, "standard": 0, "comfort": 0, "business": 0, "minivan": 0}'::jsonb NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Anyone can view routes
CREATE POLICY "Public routes are viewable by everyone."
ON routes FOR SELECT
USING (true);

-- 2. Only authenticated users can insert/update/delete routes
CREATE POLICY "Authenticated users can create routes."
ON routes FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update routes."
ON routes FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete routes."
ON routes FOR DELETE
TO authenticated
USING (true);

-- Create storage bucket for route images
INSERT INTO storage.buckets (id, name, public) VALUES ('route-images', 'route-images', true);

-- Storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'route-images' );

CREATE POLICY "Auth Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'route-images' );

CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'route-images' );

CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'route-images' );

-- Insert initial data
INSERT INTO routes (slug, title, short_desc, full_desc, distance, time, image_url, prices) VALUES
('simferopol-yalta', 'Симферополь - Ялта', 'Живописная поездка на Южный берег Крыма', 'Закажите междугороднее такси по маршруту Симферополь - Ялта без лишних ожиданий по заранее согласованному тарифу. Мы предлагаем надежные трансферы на современных автомобилях, оборудованных кондиционерами. Опытные водители отлично знают серпантины Южного берега, обеспечивая безопасную и плавную поездку. Расстояние маршрута составляет примерно 80 км, среднее время в пути — около 1.5 часов в зависимости от дорожной обстановки.', '80 км', '~ 1 час 30 мин', 'https://images.unsplash.com/photo-1542484643-a6b12a813893?auto=format&fit=crop&q=80', '{"economy": 3500, "standard": 4000, "comfort": 4500, "business": 6000, "minivan": 5500}'::jsonb),
('airport-sevastopol', 'Аэропорт - Севастополь', 'Быстрый трансфер в город-герой', 'Комфортный трансфер из аэропорта прямо в Севастополь по фиксированной стоимости. Мы отслеживаем рейсы и корректируем время подачи машины, чтобы избежать дополнительного ожидания. Водитель встретит вас с табличкой, поможет с багажом и с комфортом доставит по нужному адресу в Севастополе. Протяженность маршрута составляет около 105 км.', '105 км', '~ 1 час 40 мин', 'https://images.unsplash.com/photo-1579208034440-42ec16428fb1?auto=format&fit=crop&q=80', '{"economy": 2800, "standard": 3200, "comfort": 3600, "business": 5000, "minivan": 4600}'::jsonb),
('sevastopol-yalta', 'Севастополь - Ялта', 'Маршрут вдоль моря и горных массивов', 'Насладитесь одним из самых живописных маршрутов Крыма, заказав такси Севастополь - Ялта. Дорога проходит вдоль моря и величественных гор. Наши водители обеспечат максимальный комфорт во время поездки, независимо от выбранного класса автомобиля.', '85 км', '~ 1 час 20 мин', 'https://images.unsplash.com/photo-1626027552550-70809277fecc?auto=format&fit=crop&q=80', '{"economy": 4000, "standard": 4500, "comfort": 5000, "business": 7000, "minivan": 6000}'::jsonb),
('simferopol-evpatoria', 'Симферополь - Евпатория', 'Комфортная поездка на западное побережье', 'Быстрый и удобный сервис такси по маршруту Симферополь - Евпатория. Идеальный выбор для семейного отдыха — по запросу мы бесплатно предоставляем детские кресла. Ровная дорога и опытные водители гарантируют спокойную поездку к песчаным пляжам.', '70 км', '~ 1 час 10 мин', 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80', '{"economy": 2500, "standard": 2900, "comfort": 3300, "business": 4500, "minivan": 4000}'::jsonb),
('yalta-alushta', 'Ялта - Алушта', 'Короткий переезд по серпантину', 'Удобный трансфер между двумя главными курортами Южного берега Крыма. Такси Ялта - Алушта — это быстро, безопасно и комфортно. Наши автомобили проходят регулярное техническое обслуживание для безопасного передвижения по горным дорогам.', '35 км', '~ 45 мин', 'https://images.unsplash.com/photo-1582266857640-c75c5e009477?auto=format&fit=crop&q=80', '{"economy": 1500, "standard": 1800, "comfort": 2000, "business": 3000, "minivan": 2500}'::jsonb),
('alushta-airport', 'Алушта - Аэропорт', 'Трансфер ко времени вылета', 'Надежный трансфер из Алушты в аэропорт. Подаем машину строго к оговоренному времени, чтобы вы прибыли на регистрацию без опозданий и спешки. Поможем с погрузкой багажа и выберем оптимальный маршрут с учетом возможных пробок.', '65 км', '~ 1 час', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80', '{"economy": 2200, "standard": 2500, "comfort": 2800, "business": 4000, "minivan": 3500}'::jsonb);
