/**
 * 广西少数民族文化遗产数字化保护与展示平台 - Mock 数据 (多语言)
 * 字段格式: { zh: '中文', en: 'English', za: '壮语' }
 */

import {
  resourceCovers, inheritorAvatars, workImages,
  productImages, tourCovers, hotspotImages
} from './imageUrls'

// ========== 文化资源列表 (12条) ==========
export const culturalResources = [
  {
    id: 1,
    title: { zh: '壮族布洛陀经诗', en: 'Zhuang Buluotuo Scripture Poems', za: 'Bouxcuengh Bujlozdoz Ginghsi' },
    type: 'ancientBooks', ethnicity: 'zhuang',
    region: { zh: '百色', en: 'Baise', za: 'Bwzswz' },
    cover: resourceCovers['壮族布洛陀经诗'],
    description: { zh: '壮族创世史诗，记载壮族始祖布洛陀造天造地造万物的传说，是壮族民间文学的瑰宝。', en: 'A Zhuang creation epic recording the legend of ancestor Buluotuo creating heaven, earth and all things.', za: 'Bouxcuengh couhsi sijsi, geijcaiz Bouxcuengh cojcuz Bujlozdoz caux din caux deih caux fanh mued guh cwnzswij.' },
    background: { zh: '布洛陀经诗流传于广西右江河谷及红水河流域，是壮族巫师在祭祀、禳灾时吟唱的经文，具有浓厚的原始宗教色彩。', en: 'The Buluotuo Scripture Poems circulate in the Youjiang River valley and Hongshui River basin of Guangxi, chanted by Zhuang shamans during rituals.', za: 'Bujlozdoz Ginghsi liuzcwnz youq Gvangjsih Youjgyangh Hozcuz caeuq Hungzsuj Hozcuz.' },
    history: { zh: '相传为壮族先民口耳相传，唐代起有文字记载，历经千年传承至今。', en: 'Passed down orally by Zhuang ancestors, with written records since the Tang Dynasty.', za: 'Cwnzcwij Bouxcuengh sienminz haeuj ndang cwnzcenz.' },
    status: { zh: '2006年列入国家级非物质文化遗产名录，现有传承人20余名。', en: 'Listed as National Intangible Cultural Heritage in 2006, with over 20 inheritors.', za: '2006 nienz liez hawj Gozgyagiep Feiyiz Vwnzva Yicanj Mingluz.' },
    tags: { zh: ['创世史诗', '壮族文学', '宗教典籍'], en: ['Creation Epic', 'Zhuang Literature', 'Religious Scripture'], za: ['Couhsi Sijsi', 'Bouxcuengh Vwnzhoz', 'Cunghgyauj Dienjciz'] }
  },
  {
    id: 2,
    title: { zh: '瑶族过山榜', en: 'Yao Guoshanbang Document', za: 'Bouxyauz Gvaqsanh Bangj' },
    type: 'ancientBooks', ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: resourceCovers['瑶族过山榜'],
    description: { zh: '瑶族民间流传的文书，记录瑶族迁徙历史与民族身份认同，是研究瑶族历史的重要文献。', en: 'A folk document of the Yao people recording their migration history and ethnic identity.', za: 'Bouxyauz minzgyanh liuzcwnz guh vwnzsuj, geijluz Bouxyauz cienzsi lizsij caeuq minzcuz sinhfwnh yindingh.' },
    background: { zh: '过山榜又称《评皇券牒》，相传由评皇赐予瑶族先民，允许其开荒种地、免除赋税。', en: 'Also known as "Pinghuang Charter", legendarily granted by Emperor Ping to Yao ancestors.', za: 'Gvaqsanh Bangj youq heuh "Bingzhuangz Gienzdiep".' },
    history: { zh: '可追溯至宋代，是瑶族"漂洋过海"传说的文字版本，反映了瑶族的迁徙历程。', en: 'Traceable to the Song Dynasty, reflecting the Yao migration journey.', za: 'Ndaej cuijsoh dauq Sunghcaiz.' },
    status: { zh: '部分瑶族村寨仍存有手抄本，民间有专人保管，传承面临古籍老化问题。', en: 'Some Yao villages still preserve handwritten copies. Preservation faces aging manuscript challenges.', za: 'Bouxfwnh Bouxyauz yenzcaiz hwng cwnh miz sujcauj bonj.' },
    tags: { zh: ['瑶族历史', '迁徙文献', '民族认同'], en: ['Yao History', 'Migration Document', 'Ethnic Identity'], za: ['Bouxyauz Lizsij', 'Cienzsi Vwnzyen', 'Minzcuz Yindingh'] }
  },
  {
    id: 3,
    title: { zh: '苗族古歌', en: 'Miao Ancient Songs', za: 'Bouxyouz Gujgoj' },
    type: 'ancientBooks', ethnicity: 'miao',
    region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' },
    cover: resourceCovers['苗族古歌'],
    description: { zh: '苗族口传史诗，叙述开天辟地、人类起源、民族迁徙等重大历史事件。', en: 'An oral epic of the Miao people, narrating the creation of the world, human origins, and ethnic migration.', za: 'Bouxyouz haeuj ndang cwnzcenz sijsi.' },
    background: { zh: '古歌在苗族重大节日和婚丧嫁娶时由歌师吟唱，是苗族文化的百科全书。', en: 'Ancient songs are chanted by song masters during major festivals and life ceremonies.', za: 'Gujgoj youq Bouxyouz cungqdaih cietnyied.' },
    history: { zh: '无文字记载，完全靠口耳相传，可追溯至苗族迁徙西南之前。', en: 'Without written records, passed entirely through oral tradition.', za: 'Mbouj miz vwnzciz geijcaiz.' },
    status: { zh: '2008年列入国家级非遗，融水、三江等地有传习所。', en: 'Listed as National Intangible Heritage in 2008.', za: '2008 nienz liez hawj Gozgyagiep Feiyiz.' },
    tags: { zh: ['口传史诗', '苗族文学', '创世神话'], en: ['Oral Epic', 'Miao Literature', 'Creation Myth'], za: ['Haeuj Ndang Sijsi', 'Bouxyouz Vwnzhoz', 'Couhsi Sinzva'] }
  },
  {
    id: 4,
    title: { zh: '壮族织锦技艺', en: 'Zhuang Brocade Weaving', za: 'Bouxcuengh Cikgim Gihneih' },
    type: 'skills', ethnicity: 'zhuang',
    region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' },
    cover: resourceCovers['壮族织锦技艺'],
    description: { zh: '壮族传统织锦工艺，以五彩丝线织出精美图案，壮锦与云锦、蜀锦、宋锦并称中国四大名锦。', en: 'Traditional Zhuang brocade weaving using colorful silk threads. One of China\'s Four Famous Brocades.', za: 'Bouxcuengh cwnztungz cikgim gunghneih.' },
    background: { zh: '壮族女子自幼习织，出嫁时织锦做嫁妆。壮锦纹样寓意吉祥。', en: 'Zhuang women learn weaving from childhood, creating brocade as dowry.', za: 'Bouxcuengh mbwk cij youq iq si hag cik.' },
    history: { zh: '起源于汉代，宋代已闻名遐迩，明清时期成为贡品。', en: 'Originating in the Han Dynasty, renowned by the Song Dynasty.', za: 'Gihyenz youq Hanzaiz.' },
    status: { zh: '2006年列入国家级非遗，宾阳、靖西等地有织锦合作社。', en: 'Listed as National Intangible Heritage in 2006.', za: '2006 nienz liez hawj Gozgyagiep Feiyiz.' },
    tags: { zh: ['壮锦', '四大名锦', '传统工艺'], en: ['Zhuang Brocade', 'Four Famous Brocades', 'Traditional Craft'], za: ['Cuenghgim', 'Seih Daih Minggim', 'Cwnztungz Gunghneih'] }
  },
  {
    id: 5,
    title: { zh: '瑶族服饰制作技艺', en: 'Yao Costume Making', za: 'Bouxyauz Fuzcangj Ceihcoz Gihneih' },
    type: 'skills', ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: resourceCovers['瑶族服饰制作技艺'],
    description: { zh: '瑶族盘瑶、过山瑶等支系传统服饰制作技艺，瑶绣、挑花、蜡染工艺精湛。', en: 'Traditional costume-making of Yao sub-groups featuring exquisite embroidery, cross-stitch and batik.', za: 'Bouxyauz Banyauz, Gvaqsanhyauz daengj cihhi cwnztungz fuzcangj ceihcoz gihneih.' },
    background: { zh: '瑶族服饰是区分支系的重要标识，不同支系在头饰、衣襟、花边上各有特色。', en: 'Yao costumes serve as important markers distinguishing sub-groups.', za: 'Bouxyauz fuzcangj dwg gihfwnh cihhi guh cungqyauj biujciz.' },
    history: { zh: '传承千年，瑶族女子自幼学习刺绣，服饰承载族群记忆与文化符号。', en: 'Inherited for millennia, Yao women learn embroidery from childhood.', za: 'Cwnzcenz cienyenz.' },
    status: { zh: '部分支系服饰技艺列入省级非遗，传习所开展技艺培训。', en: 'Some sub-group costume techniques are listed as provincial intangible heritage.', za: 'Bouxfwnh cihhi fuzcangj gihneih liez hawj sengj giep feiyiz.' },
    tags: { zh: ['瑶绣', '服饰', '蜡染'], en: ['Yao Embroidery', 'Costume', 'Batik'], za: ['Yauzsiuj', 'Fuzcangj', 'Laznyaemj'] }
  },
  {
    id: 6,
    title: { zh: '苗族银饰锻造技艺', en: 'Miao Silver Jewelry Forging', za: 'Bouxyouz Ngaenzsi Doenzcaux Gihneih' },
    type: 'skills', ethnicity: 'miao',
    region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' },
    cover: resourceCovers['苗族银饰锻造技艺'],
    description: { zh: '苗族银饰制作工艺，包括锻打、錾刻、镶嵌等，银饰是苗族盛装的重要组成部分。', en: 'Miao silver jewelry craftsmanship including forging, chasing and inlaying.', za: 'Bouxyouz ngaenzsi ceihcoz gunghneih.' },
    background: { zh: '苗族素有"穿在身上的史书"之称，银饰既是财富象征，也承载祈福辟邪之意。', en: 'The Miao are known as "wearing history on their bodies".', za: 'Bouxyouz suj miz "cuen youq ndang guh sijsu" cih cingz.' },
    history: { zh: '明清时期苗族银饰制作达到高峰，融水苗族银饰独具特色。', en: 'Miao silver craftsmanship peaked during the Ming and Qing Dynasties.', za: 'Mingzcingz sizciz Bouxyouz ngaenzsi ceihcoz daddauq gaujfungh.' },
    status: { zh: '融水苗族银饰技艺列入自治区非遗，有专业银饰工坊传承。', en: 'Listed as autonomous region intangible heritage, with professional workshops.', za: 'Yunghsuj Bouxyouz ngaenzsi gihneih liez hawj Cihcigih Feiyiz.' },
    tags: { zh: ['银饰', '锻打', '錾刻'], en: ['Silver Jewelry', 'Forging', 'Chasing'], za: ['Ngaenzsi', 'Doenzdaj', 'Caenzgek'] }
  },

  {
    id: 7,
    title: { zh: '侗族木构建筑营造技艺', en: 'Dong Timber Architecture', za: 'Bouxgaeml Muggou Gienzcuz Yinghcaux Gihneih' },
    type: 'skills', ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: resourceCovers['侗族木构建筑营造技艺'],
    description: { zh: '侗族鼓楼、风雨桥等木构建筑营造技艺，不用一钉一铆，榫卯结构精妙绝伦。', en: 'Dong timber construction of drum towers and wind-rain bridges, using mortise-and-tenon joints without nails.', za: 'Bouxgaeml Gujlauz, Funghyij Giuz daengj muggou gienzcuz yinghcaux gihneih.' },
    background: { zh: '侗族村寨以鼓楼为中心，风雨桥横跨溪流，全部采用传统木构技艺建造。', en: 'Dong villages center around drum towers, with wind-rain bridges spanning streams.', za: 'Bouxgaeml yenzcaiz yungh Gujlauz guh cunghsim.' },
    history: { zh: '传承数百年，侗族木匠技艺世代相传，程阳风雨桥为代表性作品。', en: 'Inherited for centuries, Chengyang Wind-Rain Bridge is a representative masterpiece.', za: 'Cwnzcenz gij baek nienz.' },
    status: { zh: '列入国家级非遗，三江有木构技艺传习所。', en: 'Listed as National Intangible Heritage, with timber craft training centers in Sanjiang.', za: 'Liez hawj Gozgyagiep Feiyiz.' },
    tags: { zh: ['木构建筑', '鼓楼', '风雨桥'], en: ['Timber Architecture', 'Drum Tower', 'Wind-Rain Bridge'], za: ['Muggou Gienzcuz', 'Gujlauz', 'Funghyij Giuz'] }
  },
  {
    id: 8,
    title: { zh: '侗族大歌', en: 'Dong Grand Song', za: 'Bouxgaeml Daihgoj' },
    type: 'music', ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: resourceCovers['侗族大歌'],
    description: { zh: '侗族民间多声部合唱，无指挥无伴奏，自然和声如天籁，被誉为"天籁之音"。', en: 'A Dong polyphonic folk chorus without conductor or accompaniment, praised as "heavenly music".', za: 'Bouxgaeml minzgyanh doj swnghbouh habcangj.' },
    background: { zh: '侗族大歌起源于春秋战国，是侗族人日常交往、节日庆典中的重要表达方式。', en: 'Originating in the Spring and Autumn period, vital to Dong daily communication and festivals.', za: 'Bouxgaeml Daihgoj gihyenz youq Cunhciuj Cangoz.' },
    history: { zh: '2009年列入联合国教科文组织人类非物质文化遗产代表作名录，享誉世界。', en: 'Inscribed on the UNESCO Representative List of Intangible Cultural Heritage in 2009.', za: '2009 nienz liez hawj UNESCO.' },
    status: { zh: '三江、龙胜等地建立传习基地，侗族大歌进校园项目持续推进。', en: 'Training bases established in Sanjiang and Longsheng, with ongoing school integration programs.', za: 'Samgyangh, Lungzswngh daengj deih gienlib cwnzsiz gihdeih.' },
    tags: { zh: ['多声部合唱', 'UNESCO', '天籁之音'], en: ['Polyphonic Chorus', 'UNESCO', 'Heavenly Music'], za: ['Doj Swnghbouh Habcangj', 'UNESCO', 'Dinlaiz Cih Yim'] }
  },
  {
    id: 9,
    title: { zh: '壮族铜鼓习俗', en: 'Zhuang Bronze Drum Customs', za: 'Bouxcuengh Dungzguj Sizcoeg' },
    type: 'folklore', ethnicity: 'zhuang',
    region: { zh: '河池', en: 'Hechi', za: 'Hozciz' },
    cover: resourceCovers['壮族铜鼓习俗'],
    description: { zh: '壮族铜鼓铸造与使用习俗，铜鼓是壮族权力与财富的象征，用于祭祀、庆典。', en: 'Zhuang bronze drum casting and usage customs, symbolizing power and wealth.', za: 'Bouxcuengh dungzguj cujcaux caeuq siyungh sizcoeg.' },
    background: { zh: '铜鼓文化起源于战国，壮族先民铸造和使用铜鼓已有两千余年历史。', en: 'Bronze drum culture originated in the Warring States period, over 2,000 years ago.', za: 'Dungzguj vwnzva gihyenz youq Cangoz.' },
    history: { zh: '广西出土铜鼓数量居全国之首，东兰、巴马一带仍有民间铜鼓收藏与演奏习俗。', en: 'Guangxi has unearthed the most bronze drums in China.', za: 'Gvangjsih ok doj dungzguj soujliengz gij cienzgoz cih suj.' },
    status: { zh: '铜鼓习俗列入国家级非遗，东兰县建有铜鼓博物馆。', en: 'Listed as National Intangible Heritage. Donglan County has a Bronze Drum Museum.', za: 'Dungzguj sizcoeg liez hawj Gozgyagiep Feiyiz.' },
    tags: { zh: ['铜鼓', '壮族习俗', '祭祀文化'], en: ['Bronze Drum', 'Zhuang Customs', 'Ritual Culture'], za: ['Dungzguj', 'Bouxcuengh Sizcoeg', 'Ceihsiz Vwnzva'] }
  },
  {
    id: 10,
    title: { zh: '壮族三月三歌圩', en: 'Zhuang Sanyuesan Song Fair', za: 'Bouxcuengh Sam Nyied Sam Gojhui' },
    type: 'folklore', ethnicity: 'zhuang',
    region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' },
    cover: resourceCovers['壮族三月三歌圩'],
    description: { zh: '壮族传统歌节，农历三月初三，青年男女对歌传情，是壮族最具代表性的民俗活动。', en: 'A traditional Zhuang song festival on the 3rd day of the 3rd lunar month.', za: 'Bouxcuengh cwnztungz gojciet.' },
    background: { zh: '歌圩起源于祭祀与择偶，后发展为集对歌、抛绣球、抢花炮于一体的盛大节日。', en: 'Originating from rituals and courtship, it evolved into a grand festival.', za: 'Gojhui gihyenz youq ceihsiz caeuq cwzngauz.' },
    history: { zh: '可追溯至唐代，刘三姐传说与之密不可分，现已成广西法定节日。', en: 'Traceable to the Tang Dynasty, now an official Guangxi holiday.', za: 'Ndaej cuijsoh dauq Dangzcaiz.' },
    status: { zh: '全区各地举办三月三活动，武鸣歌圩规模最大。', en: 'Celebrated across Guangxi, with the largest fair in Wuming.', za: 'Cienz gih gag deih gvej banj Sam Nyied Sam hodungh.' },
    tags: { zh: ['歌圩', '三月三', '刘三姐'], en: ['Song Fair', 'Sanyuesan', 'Liu Sanjie'], za: ['Gojhui', 'Sam Nyied Sam', 'Liujsamceh'] }
  },
  {
    id: 11,
    title: { zh: '瑶族长鼓舞', en: 'Yao Long Drum Dance', za: 'Bouxyauz Canghguj Vuj' },
    type: 'music', ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: resourceCovers['瑶族长鼓舞'],
    description: { zh: '瑶族传统舞蹈，舞者持长鼓而舞，节奏明快，是盘王节等重要节日的核心表演。', en: 'A traditional Yao dance where performers dance with long drums in lively rhythms.', za: 'Bouxyauz cwnztungz vujdauj.' },
    background: { zh: '长鼓舞起源于瑶族祭祀盘王的仪式，鼓声象征与祖先沟通。', en: 'Originating from Yao rituals honoring King Pan, the drum beats symbolize communication with ancestors.', za: 'Canghguj Vuj gihyenz youq Bouxyauz ceihsiz Banzvangh guh yizsiz.' },
    history: { zh: '传承千年，过山瑶、平地瑶等支系各有特色，2006年列入国家级非遗。', en: 'Inherited for millennia. Listed as National Intangible Heritage in 2006.', za: 'Cwnzcenz cienyenz.' },
    status: { zh: '贺州、金秀等地有长鼓舞传习所，校园推广成效显著。', en: 'Training centers in Hezhou and Jinxiu, with notable success in school promotion.', za: 'Hocouh, Gimsiuj daengj deih miz Canghguj Vuj cwnzsizsoj.' },
    tags: { zh: ['长鼓舞', '瑶族舞蹈', '盘王节'], en: ['Long Drum Dance', 'Yao Dance', 'Pan Wang Festival'], za: ['Canghguj Vuj', 'Bouxyauz Vujdauj', 'Banzvangh Ciet'] }
  },
  {
    id: 12,
    title: { zh: '侗族芦笙踩堂', en: 'Dong Lusheng Caitang Dance', za: 'Bouxgaeml Luzswngh Caijdangz' },
    type: 'music', ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: resourceCovers['侗族芦笙踩堂'],
    description: { zh: '侗族芦笙舞，男子吹芦笙、女子踩堂而舞，是侗族节庆重要表演形式。', en: 'A Dong dance where men play lusheng pipes and women dance in the hall.', za: 'Bouxgaeml luzswngh vuj.' },
    background: { zh: '芦笙踩堂多在鼓楼坪举行，是侗族村寨团结协作的体现。', en: 'Usually held at the drum tower square, embodying Dong village unity.', za: 'Luzswngh Caijdangz doj youq Gujlauz bingz gvej banj.' },
    history: { zh: '与侗族大歌一样，芦笙踩堂传承数百年，是侗族音乐舞蹈的瑰宝。', en: 'Like the Dong Grand Song, inherited for centuries.', za: 'Caeuq Bouxgaeml Daihgoj ityangh.' },
    status: { zh: '三江侗族芦笙踩堂列入自治区非遗，学校开设芦笙课程。', en: 'Listed as autonomous region intangible heritage, with lusheng courses in schools.', za: 'Samgyangh Bouxgaeml Luzswngh Caijdangz liez hawj Cihcigih Feiyiz.' },
    tags: { zh: ['芦笙', '踩堂', '侗族舞蹈'], en: ['Lusheng', 'Caitang', 'Dong Dance'], za: ['Luzswngh', 'Caijdangz', 'Bouxgaeml Vujdauj'] }
  }
]


// ========== 传承人列表 (8条) ==========
export const inheritors = [
  {
    id: 1, name: { zh: '韦金凤', en: 'Wei Jinfeng', za: 'Veiz Gimfungh' }, ethnicity: 'zhuang',
    skill: { zh: '壮族织锦技艺', en: 'Zhuang Brocade Weaving', za: 'Bouxcuengh Cikgim Gihneih' },
    level: 'national', region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' }, years: 45,
    avatar: inheritorAvatars['韦金凤'],
    intro: { zh: '国家级非物质文化遗产代表性传承人，自幼随母亲学习织锦，技艺精湛，作品曾作为国礼赠送外宾。', en: 'National representative inheritor. Learned brocade weaving from her mother since childhood. Her works have been presented as state gifts.', za: 'Gozgyagiep Feiyiz Vwnzva Yicanj daibyauj singq cwnzcenz vunz.' },
    works: [
      { title: { zh: '凤凰牡丹图', en: 'Phoenix Peony Painting', za: 'Funghvangz Mujdanh Duz' }, image: workImages['凤凰牡丹图'] },
      { title: { zh: '壮锦屏风', en: 'Zhuang Brocade Screen', za: 'Cuenghgim Bingzfungh' }, image: workImages['壮锦屏风'] },
      { title: { zh: '壮锦壁挂十二生肖', en: 'Zodiac Brocade Wall Hanging', za: 'Cuenghgim Biggvaq Cib Ngeih Swnghsiuj' }, image: workImages['壮锦壁挂十二生肖'] }
    ]
  },
  {
    id: 2, name: { zh: '黄兰芬', en: 'Huang Lanfen', za: 'Vangz Lanzfwn' }, ethnicity: 'zhuang',
    skill: { zh: '壮族布洛陀经诗', en: 'Buluotuo Scripture Poems', za: 'Bujlozdoz Ginghsi' },
    level: 'national', region: { zh: '百色', en: 'Baise', za: 'Bwzswz' }, years: 38,
    avatar: inheritorAvatars['黄兰芬'],
    intro: { zh: '壮族民间歌师，能完整吟唱布洛陀经诗十二部，致力于经诗记录与青年传承人培养。', en: 'A Zhuang folk song master who can chant all twelve volumes of Buluotuo Scripture Poems.', za: 'Bouxcuengh minzgyanh gojsih.' },
    works: [
      { title: { zh: '布洛陀经诗录音整理', en: 'Buluotuo Poems Audio Archive', za: 'Bujlozdoz Ginghsi Luzim Cingjlij' }, image: workImages['布洛陀经诗录音整理'] },
      { title: { zh: '经诗传习教材', en: 'Scripture Teaching Materials', za: 'Ginghsi Cwnzsiz Gyaucaiz' }, image: workImages['经诗传习教材'] }
    ]
  },
  {
    id: 3, name: { zh: '赵凤仙', en: 'Zhao Fengxian', za: 'Ciuj Funghsienz' }, ethnicity: 'yao',
    skill: { zh: '瑶族服饰制作技艺', en: 'Yao Costume Making', za: 'Bouxyauz Fuzcangj Ceihcoz' },
    level: 'provincial', region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' }, years: 32,
    avatar: inheritorAvatars['赵凤仙'],
    intro: { zh: '自治区级非遗传承人，擅长盘瑶服饰刺绣与挑花，作品多次参加全国非遗展。', en: 'Provincial-level inheritor, skilled in Pan Yao costume embroidery and cross-stitch.', za: 'Cihcigih giep feiyiz cwnzcenz vunz.' },
    works: [
      { title: { zh: '盘瑶盛装', en: 'Pan Yao Ceremonial Dress', za: 'Banyauz Swnghcangj' }, image: workImages['盘瑶盛装'] },
      { title: { zh: '瑶族绣花鞋', en: 'Yao Embroidered Shoes', za: 'Bouxyauz Siujfaj Haiz' }, image: workImages['瑶族绣花鞋'] },
      { title: { zh: '挑花围裙', en: 'Cross-stitch Apron', za: 'Diaujfaj Veizginz' }, image: workImages['挑花围裙'] }
    ]
  },
  {
    id: 4, name: { zh: '梁敏和', en: 'Liang Minhe', za: 'Liangz Minhhoz' }, ethnicity: 'miao',
    skill: { zh: '苗族银饰锻造技艺', en: 'Miao Silver Forging', za: 'Bouxyouz Ngaenzsi Doenzcaux' },
    level: 'provincial', region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' }, years: 28,
    avatar: inheritorAvatars['梁敏和'],
    intro: { zh: '自治区级传承人，精通银饰锻打、錾刻技艺，创办银饰工坊带动村民致富。', en: 'Provincial-level inheritor, expert in silver forging and chasing. Founded a silver workshop.', za: 'Cihcigih giep cwnzcenz vunz.' },
    works: [
      { title: { zh: '苗族银冠', en: 'Miao Silver Crown', za: 'Bouxyouz Ngaenzgvanh' }, image: workImages['苗族银冠'] },
      { title: { zh: '银项圈', en: 'Silver Necklace', za: 'Ngaenz Hanghgienz' }, image: workImages['银项圈'] },
      { title: { zh: '银手镯套装', en: 'Silver Bracelet Set', za: 'Ngaenz Sujcoz Daujcangj' }, image: workImages['银手镯套装'] }
    ]
  },

  {
    id: 5, name: { zh: '杨似玉', en: 'Yang Siyu', za: 'Yangz Siznyug' }, ethnicity: 'dong',
    skill: { zh: '侗族木构建筑营造技艺', en: 'Dong Timber Architecture', za: 'Bouxgaeml Muggou Gienzcuz' },
    level: 'national', region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' }, years: 50,
    avatar: inheritorAvatars['杨似玉'],
    intro: { zh: '国家级非遗传承人，侗族木匠世家，主持修复多座鼓楼风雨桥，被誉为"木构大师"。', en: 'National-level inheritor from a Dong carpentry family, known as "Timber Master".', za: 'Gozgyagiep feiyiz cwnzcenz vunz.' },
    works: [
      { title: { zh: '程阳风雨桥修复', en: 'Chengyang Bridge Restoration', za: 'Cwngzyangz Funghyij Giuz Siujfug' }, image: workImages['程阳风雨桥修复'] },
      { title: { zh: '三江鼓楼', en: 'Sanjiang Drum Tower', za: 'Samgyangh Gujlauz' }, image: workImages['三江鼓楼'] }
    ]
  },
  {
    id: 6, name: { zh: '吴金敏', en: 'Wu Jinmin', za: 'Nguz Gimminh' }, ethnicity: 'dong',
    skill: { zh: '侗族大歌', en: 'Dong Grand Song', za: 'Bouxgaeml Daihgoj' },
    level: 'national', region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' }, years: 40,
    avatar: inheritorAvatars['吴金敏'],
    intro: { zh: '国家级侗族大歌传承人，带领侗族大歌走向世界，多次赴海外演出交流。', en: 'National-level Dong Grand Song inheritor who brought the art to the world stage.', za: 'Gozgyagiep Bouxgaeml Daihgoj cwnzcenz vunz.' },
    works: [
      { title: { zh: '侗族大歌进校园', en: 'Grand Song in Schools', za: 'Daihgoj Hawj Hauzyen' }, image: workImages['侗族大歌进校园'] },
      { title: { zh: '大歌传承基地', en: 'Grand Song Heritage Base', za: 'Daihgoj Cwnzcenz Gihdeih' }, image: workImages['大歌传承基地'] }
    ]
  },
  {
    id: 7, name: { zh: '盘秀英', en: 'Pan Xiuying', za: 'Banz Siujyingh' }, ethnicity: 'yao',
    skill: { zh: '瑶族长鼓舞', en: 'Yao Long Drum Dance', za: 'Bouxyauz Canghguj Vuj' },
    level: 'municipal', region: { zh: '河池', en: 'Hechi', za: 'Hozciz' }, years: 25,
    avatar: inheritorAvatars['盘秀英'],
    intro: { zh: '市级非遗传承人，自幼习舞，擅长过山瑶长鼓舞，在金秀多个村寨教授学徒。', en: 'Municipal-level inheritor, specializing in Guoshan Yao long drum dance.', za: 'Sigih giep feiyiz cwnzcenz vunz.' },
    works: [
      { title: { zh: '长鼓舞进校园', en: 'Drum Dance in Schools', za: 'Canghguj Vuj Hawj Hauzyen' }, image: workImages['长鼓舞进校园'] },
      { title: { zh: '盘王节领舞', en: 'Pan Wang Festival Lead Dance', za: 'Banzvangh Ciet Linghvuj' }, image: workImages['盘王节领舞'] }
    ]
  },
  {
    id: 8, name: { zh: '农志强', en: 'Nong Zhiqiang', za: 'Nungz Cicgiengz' }, ethnicity: 'zhuang',
    skill: { zh: '壮族铜鼓习俗', en: 'Zhuang Bronze Drum Customs', za: 'Bouxcuengh Dungzguj Sizcoeg' },
    level: 'provincial', region: { zh: '河池', en: 'Hechi', za: 'Hozciz' }, years: 35,
    avatar: inheritorAvatars['农志强'],
    intro: { zh: '自治区级铜鼓传承人，精通铜鼓演奏与维护，收藏多面清代铜鼓，致力于铜鼓文化传播。', en: 'Provincial-level bronze drum inheritor, expert in drum performance and maintenance.', za: 'Cihcigih giep dungzguj cwnzcenz vunz.' },
    works: [
      { title: { zh: '铜鼓博物馆讲解', en: 'Museum Guided Tour', za: 'Dungzguj Bozvuzgvanh Gangjgaij' }, image: workImages['铜鼓博物馆讲解'] },
      { title: { zh: '铜鼓演奏教学', en: 'Drum Performance Teaching', za: 'Dungzguj Yenjcou Gyaujhag' }, image: workImages['铜鼓演奏教学'] }
    ]
  }
]


// ========== 文创产品列表 (8条) ==========
export const products = [
  { id: 1, name: { zh: '壮锦云肩披肩', en: 'Zhuang Brocade Cloud Shawl', za: 'Cuenghgim Yunzgienz Bijgienz' }, category: 'clothing', price: 398, image: productImages['壮锦云肩披肩'], description: { zh: '采用传统壮锦纹样，手工编织云肩披肩，适合日常穿搭与民族风造型。', en: 'Handwoven cloud shawl with traditional Zhuang brocade patterns.', za: 'Caijyungh cwnztungz Cuenghgim vwnzyangj.' }, ethnicity: 'zhuang' },
  { id: 2, name: { zh: '瑶族绣花手机包', en: 'Yao Embroidered Phone Pouch', za: 'Bouxyauz Siujfaj Soujgih Bauj' }, category: 'accessories', price: 128, image: productImages['瑶族绣花手机包'], description: { zh: '瑶族挑花工艺手机包，精致刺绣纹样，实用美观。', en: 'Yao cross-stitch phone pouch with delicate embroidery patterns.', za: 'Bouxyauz diaujfaj gunghneih soujgih bauj.' }, ethnicity: 'yao' },
  { id: 3, name: { zh: '苗族银饰书签', en: 'Miao Silver Bookmark', za: 'Bouxyouz Ngaenzsi Sujciemj' }, category: 'stationery', price: 58, image: productImages['苗族银饰书签'], description: { zh: '苗族银饰工艺书签，錾刻苗族传统纹样，阅读好伴侣。', en: 'Miao silver craft bookmark with chased traditional patterns.', za: 'Bouxyouz ngaenzsi gunghneih sujciemj.' }, ethnicity: 'miao' },
  { id: 4, name: { zh: '侗族鼓楼摆件', en: 'Dong Drum Tower Figurine', za: 'Bouxgaeml Gujlauz Baejgienz' }, category: 'homeDecor', price: 268, image: productImages['侗族鼓楼摆件'], description: { zh: '木构工艺鼓楼微缩模型，榫卯结构，可拆装，适合家居摆设。', en: 'Miniature drum tower model with mortise-and-tenon joints.', za: 'Muggou gunghneih Gujlauz veizsueg mujyingz.' }, ethnicity: 'dong' },
  { id: 5, name: { zh: '壮锦抱枕套', en: 'Zhuang Brocade Cushion Cover', za: 'Cuenghgim Baujcimj Dauj' }, category: 'homeDecor', price: 168, image: productImages['壮锦抱枕套'], description: { zh: '壮锦纹样抱枕套，舒适面料，民族风情点缀家居。', en: 'Zhuang brocade pattern cushion cover with comfortable fabric.', za: 'Cuenghgim vwnzyangj baujcimj dauj.' }, ethnicity: 'zhuang' },
  { id: 6, name: { zh: '广西非遗数字藏品', en: 'Guangxi Heritage Digital Collectible', za: 'Gvangjsih Feiyiz Soujmaz Cangzbinj' }, category: 'digital', price: 29.9, image: productImages['广西非遗数字藏品'], description: { zh: '区块链数字藏品，收录壮锦、侗族大歌等非遗IP，限量发行。', en: 'Blockchain digital collectible featuring heritage IPs, limited edition.', za: 'Gihgvaijlienz soujmaz cangzbinj.' }, ethnicity: 'zhuang' },
  { id: 7, name: { zh: '瑶族蜡染帆布包', en: 'Yao Batik Canvas Bag', za: 'Bouxyauz Laznyaemj Fanzbouh Bauj' }, category: 'accessories', price: 198, image: productImages['瑶族蜡染帆布包'], description: { zh: '瑶族蜡染工艺帆布包，蓝白纹样，文艺清新。', en: 'Yao batik canvas bag with blue-white patterns.', za: 'Bouxyauz laznyaemj gunghneih fanzbouh bauj.' }, ethnicity: 'yao' },
  { id: 8, name: { zh: '侗族大歌主题T恤', en: 'Dong Grand Song T-Shirt', za: 'Bouxgaeml Daihgoj Cujdij T-suz' }, category: 'clothing', price: 89, image: productImages['侗族大歌主题T恤'], description: { zh: '侗族大歌元素设计T恤，棉质舒适，支持非遗传承。', en: 'T-shirt designed with Dong Grand Song elements.', za: 'Bouxgaeml Daihgoj yenzsuz seihgeih T-suz.' }, ethnicity: 'dong' }
]


// ========== 虚拟漫游场景 ==========
export const tourScenes = [
  {
    id: 'zhuangVillage',
    name: { zh: '壮族村寨', en: 'Zhuang Village', za: 'Bouxcuengh Yenzcaiz' },
    description: { zh: '体验壮族传统干栏式民居、织锦工坊与歌圩文化，感受壮族村寨的淳朴风情。', en: 'Experience traditional Zhuang stilt houses, brocade workshops and song fair culture.', za: 'Daejyenz Bouxcuengh cwnztungz ganlanz siz minzgij.' },
    cover: tourCovers['壮族村寨'],
    hotspots: [
      { position: { x: -2.0, y: 2.2, z: -3 }, image: hotspotImages['干栏式民居'], title: { zh: '干栏式民居', en: 'Stilt House', za: 'Ganlanz Siz Minzgij' }, content: { zh: '壮族传统干栏式木楼，底层架空通风防潮，二层居住。', en: 'Traditional Zhuang stilt wooden house, elevated for ventilation.', za: 'Bouxcuengh cwnztungz ganlanz siz muglauz.' } },
      { position: { x: 1.5, y: 2.2, z: -4 }, image: hotspotImages['织锦工坊'], title: { zh: '织锦工坊', en: 'Brocade Workshop', za: 'Cikgim Gunghfangh' }, content: { zh: '壮族女子世代传承的织锦技艺，竹笼织机织造五彩壮锦。', en: 'Brocade weaving skills passed down through generations of Zhuang women.', za: 'Bouxcuengh mbwk sihcaiz cwnzcenz guh cikgim gihneih.' } },
      { position: { x: -3.5, y: 2.2, z: -1.5 }, image: hotspotImages['长老居所'], title: { zh: '长老居所', en: 'Elder\'s Residence', za: 'Canghlauj Gijsoj' }, content: { zh: '村寨长老的居所，也是村中议事之地。', en: 'Residence of the village elder, also the place for village council meetings.', za: 'Yenzcaiz canghlauj guh gijsoj.' } },
      { position: { x: 2.5, y: 2.2, z: -1 }, image: hotspotImages['铜鼓收藏室'], title: { zh: '铜鼓收藏室', en: 'Bronze Drum Chamber', za: 'Dungzguj Soujcangz Siz' }, content: { zh: '村中祭祀用的铜鼓存放于此，铜鼓是壮族权力与财富的象征。', en: 'Bronze drums for village rituals are stored here.', za: 'Yenzcaiz cungh ceihsiz yungh guh dungzguj cunzfangh youq neix.' } },
      { position: { x: 0, y: 2.2, z: -1.5 }, image: hotspotImages['歌师传习所'], title: { zh: '歌师传习所', en: 'Song Master Studio', za: 'Gojsih Cwnzsiz Soj' }, content: { zh: '壮族歌师在此传授山歌技艺，年轻人学习布洛陀经诗与壮族山歌。', en: 'Zhuang song masters teach folk singing here.', za: 'Bouxcuengh gojsih youq neix cwnzsou sanhgoj gihneih.' } },
      { position: { x: 0.5, y: 2.1, z: -5.2 }, image: hotspotImages['壮族戏台'], title: { zh: '壮族戏台', en: 'Zhuang Opera Stage', za: 'Bouxcuengh Hihdaiz' }, content: { zh: '村寨中心戏台，三月三、丰收节时上演壮剧、山歌对唱等传统文艺。', en: 'Village center stage for Zhuang opera and antiphonal singing.', za: 'Yenzcaiz cunghsim hihdaiz.' } },
      { position: { x: -1, y: 2.2, z: -5.5 }, image: hotspotImages['粮仓'], title: { zh: '粮仓', en: 'Granary', za: 'Liengzcangz' }, content: { zh: '壮族传统粮仓，干栏式结构防潮防鼠，储存稻谷和杂粮。', en: 'Traditional Zhuang granary with stilt structure.', za: 'Bouxcuengh cwnztungz liengzcangz.' } }
    ]
  },
  {
    id: 'yaoTerraces',
    name: { zh: '瑶族梯田', en: 'Yao Terraces', za: 'Bouxyauz Ditenz' },
    description: { zh: '龙胜龙脊梯田核心景观，瑶族先民依山开垦，层层梯田宛如天梯。', en: 'Core landscape of Longji Terraces in Longsheng, carved by Yao ancestors along mountains.', za: 'Lungzswngh Lunghciz Ditenz hazsim ginghgvanh.' },
    cover: tourCovers['瑶族梯田'],
    hotspots: [
      { position: { x: -2.5, y: 1.3, z: -1 }, image: hotspotImages['瑶族吊脚楼'], title: { zh: '瑶族吊脚楼', en: 'Yao Stilt House', za: 'Bouxyauz Diaujgyoz Lauz' }, content: { zh: '依山傍水的瑶族吊脚楼，半干栏结构，与梯田共生千年。', en: 'Yao stilt houses nestled by mountains and water.', za: 'Yij sanh bangz suj guh Bouxyauz diaujgyoz lauz.' } },
      { position: { x: 2.5, y: 1.3, z: -1.5 }, image: hotspotImages['盘王庙'], title: { zh: '盘王庙', en: 'Pan Wang Temple', za: 'Banzvangh Miuj' }, content: { zh: '瑶族祭祀祖先盘王的圣地，盘王节时举行长鼓舞、还盘王愿等仪式。', en: 'Sacred site for Yao ancestor worship of King Pan.', za: 'Bouxyauz ceihsiz cojsien Banzvangh guh swnghdeih.' } },
      { position: { x: -1.5, y: 1.3, z: -5.5 }, image: hotspotImages['瑶绣工坊'], title: { zh: '瑶绣工坊', en: 'Yao Embroidery Workshop', za: 'Bouxyauz Siuj Gunghfangh' }, content: { zh: '瑶族女子自幼学习刺绣，瑶绣、挑花、蜡染工艺精湛。', en: 'Yao women learn embroidery from childhood.', za: 'Bouxyauz mbwk cij youq iq hag cizsiuj.' } },
      { position: { x: 1.8, y: 1.3, z: -6 }, image: hotspotImages['长鼓传习所'], title: { zh: '长鼓传习所', en: 'Long Drum Studio', za: 'Canghguj Cwnzsiz Soj' }, content: { zh: '瑶族长鼓舞传承之地，舞者持长鼓而舞，节奏明快。', en: 'Heritage site for Yao long drum dance.', za: 'Bouxyauz Canghguj Vuj cwnzcenz cih deih.' } },
      { position: { x: 3.5, y: 1.3, z: -3.5 }, image: hotspotImages['瑶医药房'], title: { zh: '瑶医药房', en: 'Yao Medicine House', za: 'Bouxyauz Yih Yoz Fangh' }, content: { zh: '瑶族传统医药世代相传，瑶浴、瑶药享誉盛名。', en: 'Yao traditional medicine passed down for generations.', za: 'Bouxyauz cwnztungz yihyoz sihcaiz siengcwnz.' } },
      { position: { x: -3, y: 1.3, z: -4 }, image: hotspotImages['稻作文化展示'], title: { zh: '稻作文化展示', en: 'Rice Culture Exhibition', za: 'Dauj Coz Vwnzva Canjsiz' }, content: { zh: '龙脊红瑶世代在此种植水稻，创造世界级梯田景观。', en: 'Red Yao of Longji have cultivated rice here for generations.', za: 'Lunghciz Hungzyauz sihcaiz youq neix cungh sujdauj.' } }
    ]
  }
]

// ========== 首页英雄数据统计 ==========
export const heroStats = {
  resources: 1286,
  inheritors: 328,
  ethnicGroups: 12,
  visits: 568000
}