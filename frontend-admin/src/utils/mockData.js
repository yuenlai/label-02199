/**
 * 广西少数民族文化遗产数字化保护与展示平台 - Mock 数据 (多语言)
 * 字段格式: { zh: '中文', en: 'English', za: '壮语' }
 */

import { createTitlePlaceholder } from './defaultImage'

// ========== 文化资源列表 (12条) ==========
export const culturalResources = [
  {
    id: 1,
    title: { zh: '壮族布洛陀经诗', en: 'Zhuang Buluotuo Scripture Poems', za: 'Bouxcuengh Bujlozdoz Ginghsi' },
    type: 'ancientBooks',
    ethnicity: 'zhuang',
    region: { zh: '百色', en: 'Baise', za: 'Bwzswz' },
    cover: createTitlePlaceholder('壮族布洛陀经诗', { ethnicity: 'zhuang' }),
    description: {
      zh: '壮族创世史诗，记载壮族始祖布洛陀造天造地造万物的传说，是壮族民间文学的瑰宝。',
      en: 'A Zhuang creation epic recording the legend of ancestor Buluotuo creating heaven, earth and all things. A treasure of Zhuang folk literature.',
      za: 'Bouxcuengh couhsi sijsi, geijcaiz Bouxcuengh cojcuz Bujlozdoz caux din caux deih caux fanh mued guh cwnzswij.'
    },
    background: {
      zh: '布洛陀经诗流传于广西右江河谷及红水河流域，是壮族巫师在祭祀、禳灾时吟唱的经文，具有浓厚的原始宗教色彩。',
      en: 'The Buluotuo Scripture Poems circulate in the Youjiang River valley and Hongshui River basin of Guangxi, chanted by Zhuang shamans during rituals and disaster-averting ceremonies.',
      za: 'Bujlozdoz Ginghsi liuzcwnz youq Gvangjsih Youjgyangh Hozcuz caeuq Hungzsuj Hozcuz, dwg Bouxcuengh vujsih youq ceihsiz si yinzcangj guh ginghvwnz.'
    },
    history: {
      zh: '相传为壮族先民口耳相传，唐代起有文字记载，历经千年传承至今。',
      en: 'Passed down orally by Zhuang ancestors, with written records since the Tang Dynasty, spanning over a thousand years.',
      za: 'Cwnzcwij Bouxcuengh sienminz haeuj ndang cwnzcenz, Dangzcaiz gaijcij miz vwnzciz geijcaiz, ginghgvaq cienyenz cwnzcenz dauq gijndangq.'
    },
    status: {
      zh: '2006年列入国家级非物质文化遗产名录，现有传承人20余名，多个传习所开展保护工作。',
      en: 'Listed as National Intangible Cultural Heritage in 2006, with over 20 inheritors and multiple training centers.',
      za: '2006 nienz liez hawj Gozgyagiep Feiyiz Vwnzva Yicanj Mingluz, yienzgaiq miz cwnzcenz vunz 20 lai mingh.'
    },
    tags: {
      zh: ['创世史诗', '壮族文学', '宗教典籍'],
      en: ['Creation Epic', 'Zhuang Literature', 'Religious Scripture'],
      za: ['Couhsi Sijsi', 'Bouxcuengh Vwnzhoz', 'Cunghgyauj Dienjciz']
    }
  },
  {
    id: 2,
    title: { zh: '瑶族过山榜', en: 'Yao Guoshanbang Document', za: 'Bouxyauz Gvaqsanh Bangj' },
    type: 'ancientBooks',
    ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: createTitlePlaceholder('瑶族过山榜', { ethnicity: 'yao' }),
    description: {
      zh: '瑶族民间流传的文书，记录瑶族迁徙历史与民族身份认同，是研究瑶族历史的重要文献。',
      en: 'A folk document of the Yao people recording their migration history and ethnic identity, an important source for Yao historical research.',
      za: 'Bouxyauz minzgyanh liuzcwnz guh vwnzsuj, geijluz Bouxyauz cienzsi lizsij caeuq minzcuz sinhfwnh yindingh.'
    },
    background: {
      zh: '过山榜又称《评皇券牒》，相传由评皇赐予瑶族先民，允许其开荒种地、免除赋税。',
      en: 'Also known as "Pinghuang Charter", legendarily granted by Emperor Ping to Yao ancestors, permitting land cultivation and tax exemption.',
      za: 'Gvaqsanh Bangj youq heuh "Bingzhuangz Gienzdiep", cwnzcwij Bingzhuangz ciz hawj Bouxyauz sienminz.'
    },
    history: {
      zh: '可追溯至宋代，是瑶族"漂洋过海"传说的文字版本，反映了瑶族的迁徙历程。',
      en: 'Traceable to the Song Dynasty, it is the written version of the Yao "crossing the seas" legend, reflecting their migration journey.',
      za: 'Ndaej cuijsoh dauq Sunghcaiz, dwg Bouxyauz "biujyangh gvaqhaij" cwnzswij guh vwnzciz banjbonj.'
    },
    status: {
      zh: '部分瑶族村寨仍存有手抄本，民间有专人保管，传承面临古籍老化问题。',
      en: 'Some Yao villages still preserve handwritten copies, with dedicated custodians. Preservation faces aging manuscript challenges.',
      za: 'Bouxfwnh Bouxyauz yenzcaiz hwng cwnh miz sujcauj bonj, minzgyanh miz cwnzvunz baujgvanh.'
    },
    tags: {
      zh: ['瑶族历史', '迁徙文献', '民族认同'],
      en: ['Yao History', 'Migration Document', 'Ethnic Identity'],
      za: ['Bouxyauz Lizsij', 'Cienzsi Vwnzyen', 'Minzcuz Yindingh']
    }
  },

  {
    id: 3,
    title: { zh: '苗族古歌', en: 'Miao Ancient Songs', za: 'Bouxyouz Gujgoj' },
    type: 'ancientBooks',
    ethnicity: 'miao',
    region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' },
    cover: createTitlePlaceholder('苗族古歌', { ethnicity: 'miao' }),
    description: {
      zh: '苗族口传史诗，叙述开天辟地、人类起源、民族迁徙等重大历史事件。',
      en: 'An oral epic of the Miao people, narrating the creation of the world, human origins, and ethnic migration.',
      za: 'Bouxyouz haeuj ndang cwnzcenz sijsi, gvejswij gaij din gaij deih, vunzloih gihyenz, minzcuz cienzsi.'
    },
    background: {
      zh: '古歌在苗族重大节日和婚丧嫁娶时由歌师吟唱，是苗族文化的百科全书。',
      en: 'Ancient songs are chanted by song masters during major festivals and life ceremonies, serving as an encyclopedia of Miao culture.',
      za: 'Gujgoj youq Bouxyouz cungqdaih cietnyied caeuq hwnjcoeg si youq gojsih yinzcangj, dwg Bouxyouz vwnzva guh baijgoj cienzsu.'
    },
    history: {
      zh: '无文字记载，完全靠口耳相传，可追溯至苗族迁徙西南之前。',
      en: 'Without written records, passed entirely through oral tradition, traceable to before the Miao migration to the southwest.',
      za: 'Mbouj miz vwnzciz geijcaiz, gienzciz gauj haeuj ndang cwnzcenz, ndaej cuijsoh dauq Bouxyouz cienzsi sihnamz ciqcienz.'
    },
    status: {
      zh: '2008年列入国家级非遗，融水、三江等地有传习所，年轻一代传承人培养中。',
      en: 'Listed as National Intangible Heritage in 2008, with training centers in Rongshui and Sanjiang, cultivating young inheritors.',
      za: '2008 nienz liez hawj Gozgyagiep Feiyiz, Yunghsuj, Samgyangh daengj deih miz cwnzsizsoj.'
    },
    tags: {
      zh: ['口传史诗', '苗族文学', '创世神话'],
      en: ['Oral Epic', 'Miao Literature', 'Creation Myth'],
      za: ['Haeuj Ndang Sijsi', 'Bouxyouz Vwnzhoz', 'Couhsi Sinzva']
    }
  },
  {
    id: 4,
    title: { zh: '壮族织锦技艺', en: 'Zhuang Brocade Weaving', za: 'Bouxcuengh Cikgim Gihneih' },
    type: 'skills',
    ethnicity: 'zhuang',
    region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' },
    cover: createTitlePlaceholder('壮族织锦技艺', { ethnicity: 'zhuang' }),
    description: {
      zh: '壮族传统织锦工艺，以五彩丝线织出精美图案，壮锦与云锦、蜀锦、宋锦并称中国四大名锦。',
      en: 'Traditional Zhuang brocade weaving using colorful silk threads. Zhuang brocade is one of China\'s Four Famous Brocades.',
      za: 'Bouxcuengh cwnztungz cikgim gunghneih, yungh ngux caij sihsienz cik ok gingsuj duzanh, Cuenghgim caeuq Yunzgim, Sujgim, Sunghgim bingzcingz Cunghgoz seih daih minggim.'
    },
    background: {
      zh: '壮族女子自幼习织，出嫁时织锦做嫁妆。壮锦纹样寓意吉祥，是壮族女性智慧的结晶。',
      en: 'Zhuang women learn weaving from childhood, creating brocade as dowry. The patterns symbolize good fortune and embody feminine wisdom.',
      za: 'Bouxcuengh mbwk cij youq iq si hag cik, ok gya si cikgim guh gyacangj. Cuenghgim vwnzyangj yijyi gizyangh.'
    },
    history: {
      zh: '起源于汉代，宋代已闻名遐迩，明清时期成为贡品。',
      en: 'Originating in the Han Dynasty, renowned by the Song Dynasty, and becoming tribute goods during the Ming and Qing Dynasties.',
      za: 'Gihyenz youq Hanzaiz, Sunghcaiz yij vwnzmingz, Mingzcingz sizciz cwngz hawj gunghbinj.'
    },
    status: {
      zh: '2006年列入国家级非遗，宾阳、靖西等地有织锦合作社，产品畅销国内外。',
      en: 'Listed as National Intangible Heritage in 2006, with weaving cooperatives in Binyang and Jingxi.',
      za: '2006 nienz liez hawj Gozgyagiep Feiyiz, Binhyangz, Cinghsih daengj deih miz cikgim habcozse.'
    },
    tags: {
      zh: ['壮锦', '四大名锦', '传统工艺'],
      en: ['Zhuang Brocade', 'Four Famous Brocades', 'Traditional Craft'],
      za: ['Cuenghgim', 'Seih Daih Minggim', 'Cwnztungz Gunghneih']
    }
  },
  {
    id: 5,
    title: { zh: '瑶族服饰制作技艺', en: 'Yao Costume Making', za: 'Bouxyauz Fuzcangj Ceihcoz Gihneih' },
    type: 'skills',
    ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: createTitlePlaceholder('瑶族服饰制作技艺', { ethnicity: 'yao' }),
    description: {
      zh: '瑶族盘瑶、过山瑶等支系传统服饰制作技艺，瑶绣、挑花、蜡染工艺精湛。',
      en: 'Traditional costume-making of Yao sub-groups including Pan Yao and Guoshan Yao, featuring exquisite embroidery, cross-stitch and batik.',
      za: 'Bouxyauz Banyauz, Gvaqsanhyauz daengj cihhi cwnztungz fuzcangj ceihcoz gihneih, Yauzsiuj, diaujfaj, laznyaemj gunghneih gingsuz.'
    },
    background: {
      zh: '瑶族服饰是区分支系的重要标识，不同支系在头饰、衣襟、花边上各有特色。',
      en: 'Yao costumes serve as important markers distinguishing sub-groups, each with unique headwear, lapels and trimmings.',
      za: 'Bouxyauz fuzcangj dwg gihfwnh cihhi guh cungqyauj biujciz, mbouj dungx cihhi youq daeuzsi, yigim, fajbienz gag miz daegsaek.'
    },
    history: {
      zh: '传承千年，瑶族女子自幼学习刺绣，服饰承载族群记忆与文化符号。',
      en: 'Inherited for millennia, Yao women learn embroidery from childhood. Costumes carry collective memory and cultural symbols.',
      za: 'Cwnzcenz cienyenz, Bouxyauz mbwk cij youq iq si hag cizsiuj, fuzcangj cwngzcaiz cuzgunz geijyi caeuq vwnzva fuhhawz.'
    },
    status: {
      zh: '部分支系服饰技艺列入省级非遗，传习所开展技艺培训。',
      en: 'Some sub-group costume techniques are listed as provincial intangible heritage, with training centers offering skill workshops.',
      za: 'Bouxfwnh cihhi fuzcangj gihneih liez hawj sengj giep feiyiz, cwnzsizsoj gaijcanj gihneih baijhunz.'
    },
    tags: {
      zh: ['瑶绣', '服饰', '蜡染'],
      en: ['Yao Embroidery', 'Costume', 'Batik'],
      za: ['Yauzsiuj', 'Fuzcangj', 'Laznyaemj']
    }
  },
  {
    id: 6,
    title: { zh: '苗族银饰锻造技艺', en: 'Miao Silver Jewelry Forging', za: 'Bouxyouz Ngaenzsi Doenzcaux Gihneih' },
    type: 'skills',
    ethnicity: 'miao',
    region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' },
    cover: createTitlePlaceholder('苗族银饰锻造技艺', { ethnicity: 'miao' }),
    description: {
      zh: '苗族银饰制作工艺，包括锻打、錾刻、镶嵌等，银饰是苗族盛装的重要组成部分。',
      en: 'Miao silver jewelry craftsmanship including forging, chasing and inlaying. Silver ornaments are essential to Miao ceremonial dress.',
      za: 'Bouxyouz ngaenzsi ceihcoz gunghneih, hamj doenzdaj, caenzgek, siengqgiemj daengj, ngaenzsi dwg Bouxyouz swnghcangj guh cungqyauj cuzswngj bouxfwnh.'
    },
    background: {
      zh: '苗族素有"穿在身上的史书"之称，银饰既是财富象征，也承载祈福辟邪之意。',
      en: 'The Miao are known as "wearing history on their bodies". Silver jewelry symbolizes wealth and carries blessings for protection.',
      za: 'Bouxyouz suj miz "cuen youq ndang guh sijsu" cih cingz, ngaenzsi dwg caijfuj ciengqcingz, youq cwngzcaiz gizfug bizyez cih yi.'
    },
    history: {
      zh: '明清时期苗族银饰制作达到高峰，融水苗族银饰独具特色。',
      en: 'Miao silver craftsmanship peaked during the Ming and Qing Dynasties. Rongshui Miao silverwork is uniquely distinctive.',
      za: 'Mingzcingz sizciz Bouxyouz ngaenzsi ceihcoz daddauq gaujfungh, Yunghsuj Bouxyouz ngaenzsi duzgyu daegsaek.'
    },
    status: {
      zh: '融水苗族银饰技艺列入自治区非遗，有专业银饰工坊传承。',
      en: 'Rongshui Miao silver craftsmanship is listed as autonomous region intangible heritage, with professional workshops.',
      za: 'Yunghsuj Bouxyouz ngaenzsi gihneih liez hawj Cihcigih Feiyiz, miz cwnzyez ngaenzsi gunghfangh cwnzcenz.'
    },
    tags: {
      zh: ['银饰', '锻打', '錾刻'],
      en: ['Silver Jewelry', 'Forging', 'Chasing'],
      za: ['Ngaenzsi', 'Doenzdaj', 'Caenzgek']
    }
  },

  {
    id: 7,
    title: { zh: '侗族木构建筑营造技艺', en: 'Dong Timber Architecture', za: 'Bouxgaeml Muggou Gienzcuz Yinghcaux Gihneih' },
    type: 'skills',
    ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: createTitlePlaceholder('侗族木构建筑营造技艺', { ethnicity: 'dong' }),
    description: {
      zh: '侗族鼓楼、风雨桥等木构建筑营造技艺，不用一钉一铆，榫卯结构精妙绝伦。',
      en: 'Dong timber construction of drum towers and wind-rain bridges, using mortise-and-tenon joints without nails.',
      za: 'Bouxgaeml Gujlauz, Funghyij Giuz daengj muggou gienzcuz yinghcaux gihneih, mbouj yungh it dingh it mauj, swnmauj gietgou gingsuz.'
    },
    background: {
      zh: '侗族村寨以鼓楼为中心，风雨桥横跨溪流，全部采用传统木构技艺建造。',
      en: 'Dong villages center around drum towers, with wind-rain bridges spanning streams, all built using traditional timber techniques.',
      za: 'Bouxgaeml yenzcaiz yungh Gujlauz guh cunghsim, Funghyij Giuz hwngzgvaq haijliuz, cienzbouh caijyungh cwnztungz muggou gihneih gienzcaux.'
    },
    history: {
      zh: '传承数百年，侗族木匠技艺世代相传，程阳风雨桥为代表性作品。',
      en: 'Inherited for centuries, Dong carpentry skills pass through generations. Chengyang Wind-Rain Bridge is a representative masterpiece.',
      za: 'Cwnzcenz gij baek nienz, Bouxgaeml mugcangh gihneih sihcaiz siengcwnz, Cwngzyangz Funghyij Giuz dwg daibyauj singq cozcin.'
    },
    status: {
      zh: '列入国家级非遗，三江有木构技艺传习所，承接各地仿古建筑项目。',
      en: 'Listed as National Intangible Heritage, with timber craft training centers in Sanjiang undertaking restoration projects.',
      za: 'Liez hawj Gozgyagiep Feiyiz, Samgyangh miz muggou gihneih cwnzsizsoj.'
    },
    tags: {
      zh: ['木构建筑', '鼓楼', '风雨桥'],
      en: ['Timber Architecture', 'Drum Tower', 'Wind-Rain Bridge'],
      za: ['Muggou Gienzcuz', 'Gujlauz', 'Funghyij Giuz']
    }
  },
  {
    id: 8,
    title: { zh: '侗族大歌', en: 'Dong Grand Song', za: 'Bouxgaeml Daihgoj' },
    type: 'music',
    ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: createTitlePlaceholder('侗族大歌', { ethnicity: 'dong' }),
    description: {
      zh: '侗族民间多声部合唱，无指挥无伴奏，自然和声如天籁，被誉为"天籁之音"。',
      en: 'A Dong polyphonic folk chorus without conductor or accompaniment, with natural harmonies praised as "heavenly music".',
      za: 'Bouxgaeml minzgyanh doj swnghbouh habcangj, mbouj miz cihfij mbouj miz banhcou, cizyen hozswngh yij dinlaiz.'
    },
    background: {
      zh: '侗族大歌起源于春秋战国，是侗族人日常交往、节日庆典中的重要表达方式。',
      en: 'Originating in the Spring and Autumn period, the Grand Song is vital to Dong daily communication and festival celebrations.',
      za: 'Bouxgaeml Daihgoj gihyenz youq Cunhciuj Cangoz, dwg Bouxgaeml vunz nyiedcangz gaujvangh, cietnyied ginghdiemj cungh guh cungqyauj byauzdad fuengsiz.'
    },
    history: {
      zh: '2009年列入联合国教科文组织人类非物质文化遗产代表作名录，享誉世界。',
      en: 'Inscribed on the UNESCO Representative List of Intangible Cultural Heritage of Humanity in 2009, renowned worldwide.',
      za: '2009 nienz liez hawj UNESCO Vunzloih Feiyiz Vwnzva Yicanj Daibyauj Coz Mingluz, yanghyij seigyaiz.'
    },
    status: {
      zh: '三江、龙胜等地建立传习基地，侗族大歌进校园项目持续推进。',
      en: 'Training bases established in Sanjiang and Longsheng, with ongoing school integration programs.',
      za: 'Samgyangh, Lungzswngh daengj deih gienlib cwnzsiz gihdeih, Bouxgaeml Daihgoj hawj hauzyen hanghmoeg cicsiuz cuijcinz.'
    },
    tags: {
      zh: ['多声部合唱', 'UNESCO', '天籁之音'],
      en: ['Polyphonic Chorus', 'UNESCO', 'Heavenly Music'],
      za: ['Doj Swnghbouh Habcangj', 'UNESCO', 'Dinlaiz Cih Yim']
    }
  },
  {
    id: 9,
    title: { zh: '壮族铜鼓习俗', en: 'Zhuang Bronze Drum Customs', za: 'Bouxcuengh Dungzguj Sizcoeg' },
    type: 'folklore',
    ethnicity: 'zhuang',
    region: { zh: '河池', en: 'Hechi', za: 'Hozciz' },
    cover: createTitlePlaceholder('壮族铜鼓习俗', { ethnicity: 'zhuang' }),
    description: {
      zh: '壮族铜鼓铸造与使用习俗，铜鼓是壮族权力与财富的象征，用于祭祀、庆典。',
      en: 'Zhuang bronze drum casting and usage customs. The bronze drum symbolizes power and wealth, used in rituals and celebrations.',
      za: 'Bouxcuengh dungzguj cujcaux caeuq siyungh sizcoeg, dungzguj dwg Bouxcuengh gienzliz caeuq caijfuj guh ciengqcingz.'
    },
    background: {
      zh: '铜鼓文化起源于战国，壮族先民铸造和使用铜鼓已有两千余年历史。',
      en: 'Bronze drum culture originated in the Warring States period. Zhuang ancestors have cast and used bronze drums for over 2,000 years.',
      za: 'Dungzguj vwnzva gihyenz youq Cangoz, Bouxcuengh sienminz cujcaux caeuq siyungh dungzguj yij miz liengj cien lai nienz lizsij.'
    },
    history: {
      zh: '广西出土铜鼓数量居全国之首，东兰、巴马一带仍有民间铜鼓收藏与演奏习俗。',
      en: 'Guangxi has unearthed the most bronze drums in China. Donglan and Bama areas still maintain folk drum collection and performance traditions.',
      za: 'Gvangjsih ok doj dungzguj soujliengz gij cienzgoz cih suj, Dunghlanh, Bajmaj itdaiz hwng miz minzgyanh dungzguj soujcangz caeuq yenjcou sizcoeg.'
    },
    status: {
      zh: '铜鼓习俗列入国家级非遗，东兰县建有铜鼓博物馆。',
      en: 'Bronze drum customs are listed as National Intangible Heritage. Donglan County has a Bronze Drum Museum.',
      za: 'Dungzguj sizcoeg liez hawj Gozgyagiep Feiyiz, Dunghlanh Yenz gien miz Dungzguj Bozvuzgvanh.'
    },
    tags: {
      zh: ['铜鼓', '壮族习俗', '祭祀文化'],
      en: ['Bronze Drum', 'Zhuang Customs', 'Ritual Culture'],
      za: ['Dungzguj', 'Bouxcuengh Sizcoeg', 'Ceihsiz Vwnzva']
    }
  },
  {
    id: 10,
    title: { zh: '壮族三月三歌圩', en: 'Zhuang Sanyuesan Song Fair', za: 'Bouxcuengh Sam Nyied Sam Gojhui' },
    type: 'folklore',
    ethnicity: 'zhuang',
    region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' },
    cover: createTitlePlaceholder('壮族三月三歌圩', { ethnicity: 'zhuang' }),
    description: {
      zh: '壮族传统歌节，农历三月初三，青年男女对歌传情，是壮族最具代表性的民俗活动。',
      en: 'A traditional Zhuang song festival on the 3rd day of the 3rd lunar month, where young men and women sing to express love.',
      za: 'Bouxcuengh cwnztungz gojciet, nungzliz sam nyied cuj sam, cinghnienz namz mbwk dwg goj cwnzcingz, dwg Bouxcuengh coih miz daibyauj singq guh minzcoeg hodungh.'
    },
    background: {
      zh: '歌圩起源于祭祀与择偶，后发展为集对歌、抛绣球、抢花炮于一体的盛大节日。',
      en: 'Originating from rituals and courtship, it evolved into a grand festival combining antiphonal singing, embroidered ball tossing and firecracker grabbing.',
      za: 'Gojhui gihyenz youq ceihsiz caeuq cwzngauz, laez fatcanj cwngz giz dwg goj, biuj siujgiuz, ciengj fajbauj youq itdaej guh swnghndaih cietnyied.'
    },
    history: {
      zh: '可追溯至唐代，刘三姐传说与之密不可分，现已成广西法定节日。',
      en: 'Traceable to the Tang Dynasty, inseparable from the legend of Liu Sanjie, now an official Guangxi holiday.',
      za: 'Ndaej cuijsoh dauq Dangzcaiz, Liujsamceh cwnzswij caeuq cih miz mbouj ndaej fwnh, yienzgaiq yij cwngz Gvangjsih fazdingh cietnyied.'
    },
    status: {
      zh: '全区各地举办三月三活动，武鸣歌圩规模最大，吸引海内外游客。',
      en: 'Celebrated across Guangxi, with the largest fair in Wuming attracting visitors from home and abroad.',
      za: 'Cienz gih gag deih gvej banj Sam Nyied Sam hodungh, Vujmingz Gojhui gveimuj coih ndaij, haepcaeuq haijnaij vaij youhgaek.'
    },
    tags: {
      zh: ['歌圩', '三月三', '刘三姐'],
      en: ['Song Fair', 'Sanyuesan', 'Liu Sanjie'],
      za: ['Gojhui', 'Sam Nyied Sam', 'Liujsamceh']
    }
  },
  {
    id: 11,
    title: { zh: '瑶族长鼓舞', en: 'Yao Long Drum Dance', za: 'Bouxyauz Canghguj Vuj' },
    type: 'music',
    ethnicity: 'yao',
    region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' },
    cover: createTitlePlaceholder('瑶族长鼓舞', { ethnicity: 'yao' }),
    description: {
      zh: '瑶族传统舞蹈，舞者持长鼓而舞，节奏明快，是盘王节等重要节日的核心表演。',
      en: 'A traditional Yao dance where performers dance with long drums in lively rhythms, central to the Pan Wang Festival.',
      za: 'Bouxyauz cwnztungz vujdauj, vujcej ciz canghguj ndaej vuj, cietcou minggvaij, dwg Banzvangh Ciet daengj cungqyauj cietnyied guh hazsim byaujyenj.'
    },
    background: {
      zh: '长鼓舞起源于瑶族祭祀盘王的仪式，鼓声象征与祖先沟通，舞姿展现瑶族迁徙历史。',
      en: 'Originating from Yao rituals honoring King Pan, the drum beats symbolize communication with ancestors, and the dance depicts migration history.',
      za: 'Canghguj Vuj gihyenz youq Bouxyauz ceihsiz Banzvangh guh yizsiz, gujswngh ciengqcingz caeuq cojsien gujdungh, vujcih canjyienz Bouxyauz cienzsi lizsij.'
    },
    history: {
      zh: '传承千年，过山瑶、平地瑶等支系各有特色，2006年列入国家级非遗。',
      en: 'Inherited for millennia with unique styles among sub-groups. Listed as National Intangible Heritage in 2006.',
      za: 'Cwnzcenz cienyenz, Gvaqsanhyauz, Bingzdeihyauz daengj cihhi gag miz daegsaek, 2006 nienz liez hawj Gozgyagiep Feiyiz.'
    },
    status: {
      zh: '贺州、金秀等地有长鼓舞传习所，校园推广成效显著。',
      en: 'Training centers in Hezhou and Jinxiu, with notable success in school promotion programs.',
      za: 'Hocouh, Gimsiuj daengj deih miz Canghguj Vuj cwnzsizsoj, hauzyen cuijgvangj cwngzsiuj yenjcuj.'
    },
    tags: {
      zh: ['长鼓舞', '瑶族舞蹈', '盘王节'],
      en: ['Long Drum Dance', 'Yao Dance', 'Pan Wang Festival'],
      za: ['Canghguj Vuj', 'Bouxyauz Vujdauj', 'Banzvangh Ciet']
    }
  },
  {
    id: 12,
    title: { zh: '侗族芦笙踩堂', en: 'Dong Lusheng Caitang Dance', za: 'Bouxgaeml Luzswngh Caijdangz' },
    type: 'music',
    ethnicity: 'dong',
    region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' },
    cover: createTitlePlaceholder('侗族芦笙踩堂', { ethnicity: 'dong' }),
    description: {
      zh: '侗族芦笙舞，男子吹芦笙、女子踩堂而舞，是侗族节庆重要表演形式。',
      en: 'A Dong dance where men play lusheng pipes and women dance in the hall, an important festival performance.',
      za: 'Bouxgaeml luzswngh vuj, boux namz cuij luzswngh, boux mbwk caij dangz ndaej vuj, dwg Bouxgaeml cietgingh cungqyauj byaujyenj yinghsiz.'
    },
    background: {
      zh: '芦笙踩堂多在鼓楼坪举行，是侗族村寨团结协作的体现。',
      en: 'Usually held at the drum tower square, it embodies Dong village unity and cooperation.',
      za: 'Luzswngh Caijdangz doj youq Gujlauz bingz gvej banj, dwg Bouxgaeml yenzcaiz dwanzgied hiebcoz guh daejyienz.'
    },
    history: {
      zh: '与侗族大歌一样，芦笙踩堂传承数百年，是侗族音乐舞蹈的瑰宝。',
      en: 'Like the Dong Grand Song, Lusheng Caitang has been inherited for centuries, a treasure of Dong music and dance.',
      za: 'Caeuq Bouxgaeml Daihgoj ityangh, Luzswngh Caijdangz cwnzcenz gij baek nienz, dwg Bouxgaeml yinnyoz vujdauj guh gveibaux.'
    },
    status: {
      zh: '三江侗族芦笙踩堂列入自治区非遗，学校开设芦笙课程。',
      en: 'Listed as autonomous region intangible heritage, with lusheng courses offered in schools.',
      za: 'Samgyangh Bouxgaeml Luzswngh Caijdangz liez hawj Cihcigih Feiyiz, hauzyen gaijsez luzswngh gvaqcwngz.'
    },
    tags: {
      zh: ['芦笙', '踩堂', '侗族舞蹈'],
      en: ['Lusheng', 'Caitang', 'Dong Dance'],
      za: ['Luzswngh', 'Caijdangz', 'Bouxgaeml Vujdauj']
    }
  }
]


// ========== 传承人列表 (8条) ==========
export const inheritors = [
  {
    id: 1, name: { zh: '韦金凤', en: 'Wei Jinfeng', za: 'Veiz Gimfungh' }, ethnicity: 'zhuang',
    skill: { zh: '壮族织锦技艺', en: 'Zhuang Brocade Weaving', za: 'Bouxcuengh Cikgim Gihneih' },
    level: 'national', region: { zh: '南宁', en: 'Nanning', za: 'Nanzningz' }, years: 45,
    avatar: createTitlePlaceholder('韦金凤', { width: 200, height: 200, ethnicity: 'zhuang' }),
    intro: {
      zh: '国家级非物质文化遗产代表性传承人，自幼随母亲学习织锦，技艺精湛，作品曾作为国礼赠送外宾。',
      en: 'National representative inheritor of intangible cultural heritage. Learned brocade weaving from her mother since childhood. Her works have been presented as state gifts.',
      za: 'Gozgyagiep Feiyiz Vwnzva Yicanj daibyauj singq cwnzcenz vunz, cij youq iq si caeuq meh hag cikgim, gihneih gingsuz, cozcin cwngz guh gozlij ciz hawj vaijbinh.'
    },
    works: [
      { title: { zh: '凤凰牡丹图', en: 'Phoenix Peony Painting', za: 'Funghvangz Mujdanh Duz' }, image: createTitlePlaceholder('凤凰牡丹图', { width: 300, height: 200 }) },
      { title: { zh: '壮锦屏风', en: 'Zhuang Brocade Screen', za: 'Cuenghgim Bingzfungh' }, image: createTitlePlaceholder('壮锦屏风', { width: 300, height: 200 }) },
      { title: { zh: '壮锦壁挂十二生肖', en: 'Zodiac Brocade Wall Hanging', za: 'Cuenghgim Biggvaq Cib Ngeih Swnghsiuj' }, image: createTitlePlaceholder('壮锦壁挂十二生肖', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 2, name: { zh: '黄兰芬', en: 'Huang Lanfen', za: 'Vangz Lanzfwn' }, ethnicity: 'zhuang',
    skill: { zh: '壮族布洛陀经诗', en: 'Buluotuo Scripture Poems', za: 'Bujlozdoz Ginghsi' },
    level: 'national', region: { zh: '百色', en: 'Baise', za: 'Bwzswz' }, years: 38,
    avatar: createTitlePlaceholder('黄兰芬', { width: 200, height: 200, ethnicity: 'zhuang' }),
    intro: {
      zh: '壮族民间歌师，能完整吟唱布洛陀经诗十二部，致力于经诗记录与青年传承人培养。',
      en: 'A Zhuang folk song master who can chant all twelve volumes of Buluotuo Scripture Poems, dedicated to recording and training young inheritors.',
      za: 'Bouxcuengh minzgyanh gojsih, ndaej gienzciz yinzcangj Bujlozdoz Ginghsi cib ngeih bouh, coihlig youq ginghsi geijluz caeuq cinghnienz cwnzcenz vunz baijyangh.'
    },
    works: [
      { title: { zh: '布洛陀经诗录音整理', en: 'Buluotuo Poems Audio Archive', za: 'Bujlozdoz Ginghsi Luzim Cingjlij' }, image: createTitlePlaceholder('布洛陀经诗录音整理', { width: 300, height: 200 }) },
      { title: { zh: '经诗传习教材', en: 'Scripture Teaching Materials', za: 'Ginghsi Cwnzsiz Gyaucaiz' }, image: createTitlePlaceholder('经诗传习教材', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 3, name: { zh: '赵凤仙', en: 'Zhao Fengxian', za: 'Ciuj Funghsienz' }, ethnicity: 'yao',
    skill: { zh: '瑶族服饰制作技艺', en: 'Yao Costume Making', za: 'Bouxyauz Fuzcangj Ceihcoz' },
    level: 'provincial', region: { zh: '桂林', en: 'Guilin', za: 'Gveiling' }, years: 32,
    avatar: createTitlePlaceholder('赵凤仙', { width: 200, height: 200, ethnicity: 'yao' }),
    intro: {
      zh: '自治区级非遗传承人，擅长盘瑶服饰刺绣与挑花，作品多次参加全国非遗展。',
      en: 'Provincial-level inheritor, skilled in Pan Yao costume embroidery and cross-stitch. Works exhibited at national heritage shows.',
      za: 'Cihcigih giep feiyiz cwnzcenz vunz, sancangz Banyauz fuzcangj cizsiuj caeuq diaujfaj, cozcin doj ciz camgya cienzgoz feiyiz canj.'
    },
    works: [
      { title: { zh: '盘瑶盛装', en: 'Pan Yao Ceremonial Dress', za: 'Banyauz Swnghcangj' }, image: createTitlePlaceholder('盘瑶盛装', { width: 300, height: 200 }) },
      { title: { zh: '瑶族绣花鞋', en: 'Yao Embroidered Shoes', za: 'Bouxyauz Siujfaj Haiz' }, image: createTitlePlaceholder('瑶族绣花鞋', { width: 300, height: 200 }) },
      { title: { zh: '挑花围裙', en: 'Cross-stitch Apron', za: 'Diaujfaj Veizginz' }, image: createTitlePlaceholder('挑花围裙', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 4, name: { zh: '梁敏和', en: 'Liang Minhe', za: 'Liangz Minhhoz' }, ethnicity: 'miao',
    skill: { zh: '苗族银饰锻造技艺', en: 'Miao Silver Forging', za: 'Bouxyouz Ngaenzsi Doenzcaux' },
    level: 'provincial', region: { zh: '柳州', en: 'Liuzhou', za: 'Liujcouh' }, years: 28,
    avatar: createTitlePlaceholder('梁敏和', { width: 200, height: 200, ethnicity: 'miao' }),
    intro: {
      zh: '自治区级传承人，精通银饰锻打、錾刻技艺，创办银饰工坊带动村民致富。',
      en: 'Provincial-level inheritor, expert in silver forging and chasing. Founded a silver workshop to help villagers prosper.',
      za: 'Cihcigih giep cwnzcenz vunz, ginghgungh ngaenzsi doenzdaj, caenzgek gihneih, conghbanj ngaenzsi gunghfangh daihdungh cunminz cifuj.'
    },
    works: [
      { title: { zh: '苗族银冠', en: 'Miao Silver Crown', za: 'Bouxyouz Ngaenzgvanh' }, image: createTitlePlaceholder('苗族银冠', { width: 300, height: 200 }) },
      { title: { zh: '银项圈', en: 'Silver Necklace', za: 'Ngaenz Hanghgienz' }, image: createTitlePlaceholder('银项圈', { width: 300, height: 200 }) },
      { title: { zh: '银手镯套装', en: 'Silver Bracelet Set', za: 'Ngaenz Sujcoz Daujcangj' }, image: createTitlePlaceholder('银手镯套装', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 5, name: { zh: '杨似玉', en: 'Yang Siyu', za: 'Yangz Siznyug' }, ethnicity: 'dong',
    skill: { zh: '侗族木构建筑营造技艺', en: 'Dong Timber Architecture', za: 'Bouxgaeml Muggou Gienzcuz' },
    level: 'national', region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' }, years: 50,
    avatar: createTitlePlaceholder('杨似玉', { width: 200, height: 200, ethnicity: 'dong' }),
    intro: {
      zh: '国家级非遗传承人，侗族木匠世家，主持修复多座鼓楼风雨桥，被誉为"木构大师"。',
      en: 'National-level inheritor from a Dong carpentry family. Led restoration of multiple drum towers and wind-rain bridges, known as "Timber Master".',
      za: 'Gozgyagiep feiyiz cwnzcenz vunz, Bouxgaeml mugcangh sihgya, cujciz siujfug doj coj Gujlauz Funghyij Giuz, bae yij "Muggou Daihsih".'
    },
    works: [
      { title: { zh: '程阳风雨桥修复', en: 'Chengyang Bridge Restoration', za: 'Cwngzyangz Funghyij Giuz Siujfug' }, image: createTitlePlaceholder('程阳风雨桥修复', { width: 300, height: 200 }) },
      { title: { zh: '三江鼓楼', en: 'Sanjiang Drum Tower', za: 'Samgyangh Gujlauz' }, image: createTitlePlaceholder('三江鼓楼', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 6, name: { zh: '吴金敏', en: 'Wu Jinmin', za: 'Nguz Gimminh' }, ethnicity: 'dong',
    skill: { zh: '侗族大歌', en: 'Dong Grand Song', za: 'Bouxgaeml Daihgoj' },
    level: 'national', region: { zh: '三江', en: 'Sanjiang', za: 'Samgyangh' }, years: 40,
    avatar: createTitlePlaceholder('吴金敏', { width: 200, height: 200, ethnicity: 'dong' }),
    intro: {
      zh: '国家级侗族大歌传承人，带领侗族大歌走向世界，多次赴海外演出交流。',
      en: 'National-level Dong Grand Song inheritor who brought the art to the world stage, performing overseas multiple times.',
      za: 'Gozgyagiep Bouxgaeml Daihgoj cwnzcenz vunz, dailingh Bouxgaeml Daihgoj couj yangh seigyaiz, doj ciz fuj haijvaij yenjok gaujliuz.'
    },
    works: [
      { title: { zh: '侗族大歌进校园', en: 'Grand Song in Schools', za: 'Daihgoj Hawj Hauzyen' }, image: createTitlePlaceholder('侗族大歌进校园', { width: 300, height: 200 }) },
      { title: { zh: '大歌传承基地', en: 'Grand Song Heritage Base', za: 'Daihgoj Cwnzcenz Gihdeih' }, image: createTitlePlaceholder('大歌传承基地', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 7, name: { zh: '盘秀英', en: 'Pan Xiuying', za: 'Banz Siujyingh' }, ethnicity: 'yao',
    skill: { zh: '瑶族长鼓舞', en: 'Yao Long Drum Dance', za: 'Bouxyauz Canghguj Vuj' },
    level: 'municipal', region: { zh: '河池', en: 'Hechi', za: 'Hozciz' }, years: 25,
    avatar: createTitlePlaceholder('盘秀英', { width: 200, height: 200, ethnicity: 'yao' }),
    intro: {
      zh: '市级非遗传承人，自幼习舞，擅长过山瑶长鼓舞，在金秀多个村寨教授学徒。',
      en: 'Municipal-level inheritor, dancing since childhood, specializing in Guoshan Yao long drum dance, teaching apprentices in Jinxiu villages.',
      za: 'Sigih giep feiyiz cwnzcenz vunz, cij youq iq si hag vuj, sancangz Gvaqsanhyauz Canghguj Vuj, youq Gimsiuj doj guh yenzcaiz gyaujsou hagduz.'
    },
    works: [
      { title: { zh: '长鼓舞进校园', en: 'Drum Dance in Schools', za: 'Canghguj Vuj Hawj Hauzyen' }, image: createTitlePlaceholder('长鼓舞进校园', { width: 300, height: 200 }) },
      { title: { zh: '盘王节领舞', en: 'Pan Wang Festival Lead Dance', za: 'Banzvangh Ciet Linghvuj' }, image: createTitlePlaceholder('盘王节领舞', { width: 300, height: 200 }) }
    ]
  },
  {
    id: 8, name: { zh: '农志强', en: 'Nong Zhiqiang', za: 'Nungz Cicgiengz' }, ethnicity: 'zhuang',
    skill: { zh: '壮族铜鼓习俗', en: 'Zhuang Bronze Drum Customs', za: 'Bouxcuengh Dungzguj Sizcoeg' },
    level: 'provincial', region: { zh: '河池', en: 'Hechi', za: 'Hozciz' }, years: 35,
    avatar: createTitlePlaceholder('农志强', { width: 200, height: 200, ethnicity: 'zhuang' }),
    intro: {
      zh: '自治区级铜鼓传承人，精通铜鼓演奏与维护，收藏多面清代铜鼓，致力于铜鼓文化传播。',
      en: 'Provincial-level bronze drum inheritor, expert in drum performance and maintenance, collecting Qing Dynasty drums and promoting drum culture.',
      za: 'Cihcigih giep dungzguj cwnzcenz vunz, ginghgungh dungzguj yenjcou caeuq veizhoz, soujcangz doj mienz Cinghcaiz dungzguj, coihlig youq dungzguj vwnzva cwnzboj.'
    },
    works: [
      { title: { zh: '铜鼓博物馆讲解', en: 'Museum Guided Tour', za: 'Dungzguj Bozvuzgvanh Gangjgaij' }, image: createTitlePlaceholder('铜鼓博物馆讲解', { width: 300, height: 200 }) },
      { title: { zh: '铜鼓演奏教学', en: 'Drum Performance Teaching', za: 'Dungzguj Yenjcou Gyaujhag' }, image: createTitlePlaceholder('铜鼓演奏教学', { width: 300, height: 200 }) }
    ]
  }
]


// ========== 文创产品列表 (8条) ==========
export const products = [
  { id: 1, name: { zh: '壮锦云肩披肩', en: 'Zhuang Brocade Cloud Shawl', za: 'Cuenghgim Yunzgienz Bijgienz' }, category: 'clothing', price: 398, image: createTitlePlaceholder('壮锦云肩披肩', { width: 400, height: 400 }), description: { zh: '采用传统壮锦纹样，手工编织云肩披肩，适合日常穿搭与民族风造型。', en: 'Handwoven cloud shawl with traditional Zhuang brocade patterns, perfect for daily wear and ethnic style.', za: 'Caijyungh cwnztungz Cuenghgim vwnzyangj, sujgungj bienjcik yunzgienz bijgienz.' }, ethnicity: 'zhuang' },
  { id: 2, name: { zh: '瑶族绣花手机包', en: 'Yao Embroidered Phone Pouch', za: 'Bouxyauz Siujfaj Soujgih Bauj' }, category: 'accessories', price: 128, image: createTitlePlaceholder('瑶族绣花手机包', { width: 400, height: 400 }), description: { zh: '瑶族挑花工艺手机包，精致刺绣纹样，实用美观。', en: 'Yao cross-stitch phone pouch with delicate embroidery patterns, practical and beautiful.', za: 'Bouxyauz diaujfaj gunghneih soujgih bauj, gingsuz cizsiuj vwnzyangj.' }, ethnicity: 'yao' },
  { id: 3, name: { zh: '苗族银饰书签', en: 'Miao Silver Bookmark', za: 'Bouxyouz Ngaenzsi Sujciemj' }, category: 'stationery', price: 58, image: createTitlePlaceholder('苗族银饰书签', { width: 400, height: 400 }), description: { zh: '苗族银饰工艺书签，錾刻苗族传统纹样，阅读好伴侣。', en: 'Miao silver craft bookmark with chased traditional patterns, a perfect reading companion.', za: 'Bouxyouz ngaenzsi gunghneih sujciemj, caenzgek Bouxyouz cwnztungz vwnzyangj.' }, ethnicity: 'miao' },
  { id: 4, name: { zh: '侗族鼓楼摆件', en: 'Dong Drum Tower Figurine', za: 'Bouxgaeml Gujlauz Baejgienz' }, category: 'homeDecor', price: 268, image: createTitlePlaceholder('侗族鼓楼摆件', { width: 400, height: 400 }), description: { zh: '木构工艺鼓楼微缩模型，榫卯结构，可拆装，适合家居摆设。', en: 'Miniature drum tower model with mortise-and-tenon joints, detachable, ideal for home decor.', za: 'Muggou gunghneih Gujlauz veizsueg mujyingz, swnmauj gietgou, ndaej caiz cangj.' }, ethnicity: 'dong' },
  { id: 5, name: { zh: '壮锦抱枕套', en: 'Zhuang Brocade Cushion Cover', za: 'Cuenghgim Baujcimj Dauj' }, category: 'homeDecor', price: 168, image: createTitlePlaceholder('壮锦抱枕套', { width: 400, height: 400 }), description: { zh: '壮锦纹样抱枕套，舒适面料，民族风情点缀家居。', en: 'Zhuang brocade pattern cushion cover with comfortable fabric, adding ethnic charm to your home.', za: 'Cuenghgim vwnzyangj baujcimj dauj, sujsiz mienzliuz, minzcuz funghcingz diemjcui gyabae.' }, ethnicity: 'zhuang' },
  { id: 6, name: { zh: '广西非遗数字藏品', en: 'Guangxi Heritage Digital Collectible', za: 'Gvangjsih Feiyiz Soujmaz Cangzbinj' }, category: 'digital', price: 29.9, image: createTitlePlaceholder('广西非遗数字藏品', { width: 400, height: 400 }), description: { zh: '区块链数字藏品，收录壮锦、侗族大歌等非遗IP，限量发行。', en: 'Blockchain digital collectible featuring Zhuang brocade, Dong Grand Song and other heritage IPs, limited edition.', za: 'Gihgvaijlienz soujmaz cangzbinj, soujluz Cuenghgim, Bouxgaeml Daihgoj daengj feiyiz IP, yenjliengz fathangz.' }, ethnicity: 'zhuang' },
  { id: 7, name: { zh: '瑶族蜡染帆布包', en: 'Yao Batik Canvas Bag', za: 'Bouxyauz Laznyaemj Fanzbouh Bauj' }, category: 'accessories', price: 198, image: createTitlePlaceholder('瑶族蜡染帆布包', { width: 400, height: 400 }), description: { zh: '瑶族蜡染工艺帆布包，蓝白纹样，文艺清新。', en: 'Yao batik canvas bag with blue-white patterns, artistic and refreshing.', za: 'Bouxyauz laznyaemj gunghneih fanzbouh bauj, lamz baek vwnzyangj, vwnzneih cingqsim.' }, ethnicity: 'yao' },
  { id: 8, name: { zh: '侗族大歌主题T恤', en: 'Dong Grand Song T-Shirt', za: 'Bouxgaeml Daihgoj Cujdij T-suz' }, category: 'clothing', price: 89, image: createTitlePlaceholder('侗族大歌主题T恤', { width: 400, height: 400 }), description: { zh: '侗族大歌元素设计T恤，棉质舒适，支持非遗传承。', en: 'T-shirt designed with Dong Grand Song elements, comfortable cotton, supporting heritage preservation.', za: 'Bouxgaeml Daihgoj yenzsuz seihgeih T-suz, mienzciz sujsiz, cihciz feiyiz cwnzcenz.' }, ethnicity: 'dong' }
]

// ========== 社区帖子列表 (6条) ==========
export const communityPosts = [
  { id: 1, author: { zh: '壮锦爱好者', en: 'Brocade Enthusiast', za: 'Cuenghgim Ngaijhauj Cej' }, avatar: '', title: { zh: '周末去宾阳拜访韦金凤老师，收获满满！', en: 'Visited Master Wei Jinfeng in Binyang this weekend, so rewarding!', za: 'Ciuhmoeg bae Binhyangz baijfangh Veiz Gimfungh laujsih, soujhoz manj manj!' }, content: { zh: '终于见到了仰慕已久的韦老师，她手把手教了我基础的织锦技法，还送了我一块小样。壮锦真的太美了，每一针都是匠心。', en: 'Finally met the admired Master Wei. She taught me basic weaving techniques hands-on and gave me a sample. Zhuang brocade is truly beautiful, every stitch shows craftsmanship.', za: 'Cungqyuz gienz dauq yij giu yangzmuj guh Veiz laujsih, de suj baj suj gyauj liux goh gihcuj guh cikgim gihfap.' }, likes: 128, replies: 23, time: '2025-02-10 14:32', type: 'shares' },
  { id: 2, author: { zh: '非遗小白', en: 'Heritage Newbie', za: 'Feiyiz Siujbaek' }, avatar: '', title: { zh: '想入门学习壮族文化，应该从哪里开始？', en: 'Want to start learning Zhuang culture, where should I begin?', za: 'Siengj hawj mwnz hag Bouxcuengh vwnzva, yinghgai congz naij gaijcij?' }, content: { zh: '对广西少数民族文化很感兴趣，想系统了解一下，各位前辈有什么推荐的学习路径或书籍吗？', en: 'Very interested in Guangxi ethnic minority culture. Looking for systematic learning paths or book recommendations from experienced members.', za: 'Dwg Gvangjsih saujsou minzcuz vwnzva hen gamj hingqcuj, siengj hihdungj liujgaij ithaij, gagveij cienzbaej miz maz cuijgienz guh hag luzgingh roxcej sujciz ma?' }, likes: 45, replies: 18, time: '2025-02-09 20:15', type: 'discussions' },
  { id: 3, author: { zh: '瑶族文化探索者', en: 'Yao Culture Explorer', za: 'Bouxyauz Vwnzva Damqsoh Cej' }, avatar: '', title: { zh: '贺州盘王节活动招募志愿者', en: 'Hezhou Pan Wang Festival seeking volunteers', za: 'Hocouh Banzvangh Ciet hodungh caujmuj cihyenz cej' }, content: { zh: '今年盘王节定在11月中旬，需要招募20名志愿者协助活动筹备。欢迎大家报名，一起传承瑶族文化！', en: 'This year\'s Pan Wang Festival is set for mid-November. We need 20 volunteers to help with preparations. Everyone is welcome to sign up!', za: 'Gim nienz Banzvangh Ciet dingh youq 11 nyied cunghswnh, siujyauj caujmuj 20 mingh cihyenz cej hiebcuj hodungh couzbaej.' }, likes: 89, replies: 35, time: '2025-02-09 09:00', type: 'activities' },
  { id: 4, author: { zh: '侗歌迷', en: 'Dong Song Fan', za: 'Bouxgaeml Goj Miz' }, avatar: '', title: { zh: '三江侗族大歌演出资讯', en: 'Sanjiang Dong Grand Song performance info', za: 'Samgyangh Bouxgaeml Daihgoj yenjok cihswnh' }, content: { zh: '分享一组上周在三江听的侗族大歌现场照片，天籁之音名不虚传！建议有机会一定要去现场感受。', en: 'Sharing photos from last week\'s Dong Grand Song live performance in Sanjiang. The heavenly music lives up to its reputation! Highly recommend experiencing it in person.', za: 'Fenhyangh it cuz swngh ciuh youq Samgyangh dingh guh Bouxgaeml Daihgoj yienjcangh caujbienz, dinlaiz cih yim mingz mbouj yih cwnz!' }, likes: 256, replies: 42, time: '2025-02-08 16:45', type: 'shares' },
  { id: 5, author: { zh: '研学带队老师', en: 'Study Tour Teacher', za: 'Yenzhag Daihdui Laujsih' }, avatar: '', title: { zh: '讨论：如何让青少年更好地参与非遗传承？', en: 'Discussion: How to better engage youth in heritage preservation?', za: 'Doihlwnz: Yungznauh hawj cinghsaujnienz lai ndei camgya feiyiz cwnzcenz?' }, content: { zh: '带学生参加过几次非遗研学，发现孩子们对动手体验很感兴趣，但对理论部分容易走神。大家有什么好的教学方法可以分享？', en: 'After several heritage study tours with students, I found kids love hands-on experiences but lose focus during theory. Any good teaching methods to share?', za: 'Dai hagswng camgya gvaq gij ciz feiyiz yenzhag, fathienz lwgnyez dwg dunghsuj daejyenz hen gamj hingqcuj, danhsi dwg lijlwnz bouxfwnh yunghyi couj sinz.' }, likes: 67, replies: 29, time: '2025-02-08 11:20', type: 'discussions' },
  { id: 6, author: { zh: '苗银工匠', en: 'Miao Silver Artisan', za: 'Bouxyouz Ngaenz Gunghcangh' }, avatar: '', title: { zh: '融水芦笙节摄影展征稿', en: 'Rongshui Lusheng Festival photo exhibition call for entries', za: 'Yunghsuj Luzswngh Ciet sebying canj cinghgauj' }, content: { zh: '今年芦笙节将同步举办"芦笙节印象"摄影展，现面向大家征集作品。优秀作品将有机会在县文化馆展出。', en: 'This year\'s Lusheng Festival will host a "Lusheng Festival Impressions" photo exhibition. We\'re collecting submissions. Outstanding works may be displayed at the county cultural center.', za: 'Gim nienz Luzswngh Ciet ciang dungzbouh gvejbanj "Luzswngh Ciet Yinjsiengq" sebying canj, yienz mienjyangh daigya cinghgiz cozcin.' }, likes: 112, replies: 15, time: '2025-02-07 15:30', type: 'activities' }
]


// ========== 虚拟漫游场景 ==========
export const tourScenes = [
  {
    id: 'zhuangVillage',
    name: { zh: '壮族村寨', en: 'Zhuang Village', za: 'Bouxcuengh Yenzcaiz' },
    description: { zh: '体验壮族传统干栏式民居、织锦工坊与歌圩文化，感受壮族村寨的淳朴风情。', en: 'Experience traditional Zhuang stilt houses, brocade workshops and song fair culture.', za: 'Daejyenz Bouxcuengh cwnztungz ganlanz siz minzgij, cikgim gunghfangh caeuq gojhui vwnzva.' },
    cover: createTitlePlaceholder('壮族村寨', { width: 640, height: 360, ethnicity: 'zhuang' }),
    hotspots: [
      { position: { x: -2.0, y: 2.2, z: -3 }, image: createTitlePlaceholder('干栏式民居', { width: 480, height: 300 }), title: { zh: '干栏式民居', en: 'Stilt House', za: 'Ganlanz Siz Minzgij' }, content: { zh: '壮族传统干栏式木楼，底层架空通风防潮，二层居住，适应南方湿热气候。', en: 'Traditional Zhuang stilt wooden house, elevated ground floor for ventilation, living quarters on the second floor, adapted to the humid southern climate.', za: 'Bouxcuengh cwnztungz ganlanz siz muglauz, dij cwngh gyagungj dunghfungh fanghcauz, ngeih cwngh gijcuj.' } },
      { position: { x: 1.5, y: 2.2, z: -4 }, image: createTitlePlaceholder('织锦工坊', { width: 480, height: 300 }), title: { zh: '织锦工坊', en: 'Brocade Workshop', za: 'Cikgim Gunghfangh' }, content: { zh: '壮族女子世代传承的织锦技艺，竹笼织机织造五彩壮锦，壮锦与云锦、蜀锦、宋锦并称中国四大名锦。', en: 'Brocade weaving skills passed down through generations of Zhuang women, using bamboo loom to create colorful Zhuang brocade.', za: 'Bouxcuengh mbwk sihcaiz cwnzcenz guh cikgim gihneih, cuglung cikgih cikcaux ngux caij Cuenghgim.' } },
      { position: { x: -3.5, y: 2.2, z: -1.5 }, image: createTitlePlaceholder('长老居所', { width: 480, height: 300 }), title: { zh: '长老居所', en: 'Elder\'s Residence', za: 'Canghlauj Gijsoj' }, content: { zh: '村寨长老的居所，也是村中议事之地。壮族村寨实行长老制，重大事务由长老召集村民在此商议。', en: 'Residence of the village elder, also the place for village council meetings. Major affairs are discussed here under the elder system.', za: 'Yenzcaiz canghlauj guh gijsoj, yij dwg yenzcungh yihsih cih deih.' } },
      { position: { x: 2.5, y: 2.2, z: -1 }, image: createTitlePlaceholder('铜鼓收藏室', { width: 480, height: 300 }), title: { zh: '铜鼓收藏室', en: 'Bronze Drum Chamber', za: 'Dungzguj Soujcangz Siz' }, content: { zh: '村中祭祀用的铜鼓存放于此，铜鼓是壮族权力与财富的象征，节庆时由长老敲响，鼓声可传数里。', en: 'Bronze drums for village rituals are stored here, symbolizing Zhuang power and wealth, struck by elders during festivals.', za: 'Yenzcaiz cungh ceihsiz yungh guh dungzguj cunzfangh youq neix, dungzguj dwg Bouxcuengh gienzliz caeuq caijfuj guh ciengqcingz.' } },
      { position: { x: 0, y: 2.2, z: -1.5 }, image: createTitlePlaceholder('歌师传习所', { width: 480, height: 300 }), title: { zh: '歌师传习所', en: 'Song Master Studio', za: 'Gojsih Cwnzsiz Soj' }, content: { zh: '壮族歌师在此传授山歌技艺，年轻人学习布洛陀经诗与壮族山歌，是文化传承的重要场所。', en: 'Zhuang song masters teach folk singing here. Young people learn Buluotuo scriptures and Zhuang folk songs.', za: 'Bouxcuengh gojsih youq neix cwnzsou sanhgoj gihneih, nienzcingh vunz hag Bujlozdo ginghsi caeuq Bouxcuengh sanhgoj.' } },
      { position: { x: 0.5, y: 2.1, z: -5.2 }, image: createTitlePlaceholder('壮族戏台', { width: 480, height: 300 }), title: { zh: '壮族戏台', en: 'Zhuang Opera Stage', za: 'Bouxcuengh Hihdaiz' }, content: { zh: '村寨中心戏台，三月三、丰收节时上演壮剧、山歌对唱等传统文艺，是村民聚会娱乐的核心场所。', en: 'Village center stage for Zhuang opera and antiphonal singing during Sanyuesan and harvest festivals.', za: 'Yenzcaiz cunghsim hihdaiz, Sam Nyied Sam, Funghsouj Ciet si swnghyenj Cuenghgiz, sanhgoj dwg goj daengj cwnztungz vwnzneih.' } },
      { position: { x: -1, y: 2.2, z: -5.5 }, image: createTitlePlaceholder('粮仓', { width: 480, height: 300 }), title: { zh: '粮仓', en: 'Granary', za: 'Liengzcangz' }, content: { zh: '壮族传统粮仓，干栏式结构防潮防鼠，储存稻谷和杂粮，是村寨丰收的象征。', en: 'Traditional Zhuang granary with stilt structure for moisture and rodent protection, storing rice and grains.', za: 'Bouxcuengh cwnztungz liengzcangz, ganlanz siz gietgou fanghcauz fanghnou, cuzcinz daujgug caeuq cabliengz.' } }
    ]
  },
  {
    id: 'yaoTerraces',
    name: { zh: '瑶族梯田', en: 'Yao Terraces', za: 'Bouxyauz Ditenz' },
    description: { zh: '龙胜龙脊梯田核心景观，瑶族先民依山开垦，层层梯田宛如天梯，吊脚楼与盘王庙点缀其间。', en: 'Core landscape of Longji Terraces in Longsheng, carved by Yao ancestors along mountains, with stilt houses and Pan Wang temples.', za: 'Lungzswngh Lunghciz Ditenz hazsim ginghgvanh, Bouxyauz sienminz yij sanh gaijgwn, cwnghcwngh ditenz vanj yij dinhdij.' },
    cover: createTitlePlaceholder('瑶族梯田', { width: 640, height: 360, ethnicity: 'yao' }),
    hotspots: [
      { position: { x: -2.5, y: 1.3, z: -1 }, image: createTitlePlaceholder('瑶族吊脚楼', { width: 480, height: 300 }), title: { zh: '瑶族吊脚楼', en: 'Yao Stilt House', za: 'Bouxyauz Diaujgyoz Lauz' }, content: { zh: '依山傍水的瑶族吊脚楼，半干栏结构，与梯田共生千年。底层饲养牲畜，二层居住，三层储粮。', en: 'Yao stilt houses nestled by mountains and water, semi-elevated structure, coexisting with terraces for millennia.', za: 'Yij sanh bangz suj guh Bouxyauz diaujgyoz lauz, banj ganlanz gietgou, caeuq ditenz gunghswngh cienyenz.' } },
      { position: { x: 2.5, y: 1.3, z: -1.5 }, image: createTitlePlaceholder('盘王庙', { width: 480, height: 300 }), title: { zh: '盘王庙', en: 'Pan Wang Temple', za: 'Banzvangh Miuj' }, content: { zh: '瑶族祭祀祖先盘王的圣地，盘王节时举行长鼓舞、还盘王愿等仪式，是瑶族精神信仰的核心。', en: 'Sacred site for Yao ancestor worship of King Pan, hosting long drum dances and rituals during the Pan Wang Festival.', za: 'Bouxyauz ceihsiz cojsien Banzvangh guh swnghdeih, Banzvangh Ciet si gvejhangz Canghguj Vuj, haiz Banzvangh yenz daengj yizsiz.' } },
      { position: { x: -1.5, y: 1.3, z: -5.5 }, image: createTitlePlaceholder('瑶绣工坊', { width: 480, height: 300 }), title: { zh: '瑶绣工坊', en: 'Yao Embroidery Workshop', za: 'Bouxyauz Siuj Gunghfangh' }, content: { zh: '瑶族女子自幼学习刺绣，瑶绣、挑花、蜡染工艺精湛，服饰是区分支系的重要标识。', en: 'Yao women learn embroidery from childhood. Yao embroidery, cross-stitch and batik crafts are exquisite.', za: 'Bouxyauz mbwk cij youq iq hag cizsiuj, Bouxyauz siuj, diaujfaj, laznyaemj gunghneih gingsuz.' } },
      { position: { x: 1.8, y: 1.3, z: -6 }, image: createTitlePlaceholder('长鼓传习所', { width: 480, height: 300 }), title: { zh: '长鼓传习所', en: 'Long Drum Studio', za: 'Canghguj Cwnzsiz Soj' }, content: { zh: '瑶族长鼓舞传承之地，舞者持长鼓而舞，节奏明快，是盘王节等重要节日的核心表演。', en: 'Heritage site for Yao long drum dance, dancers perform with long drums in lively rhythms during Pan Wang Festival.', za: 'Bouxyauz Canghguj Vuj cwnzcenz cih deih, vujcej ciz canghguj ndwi vuj, cietcou minghgvaij.' } },
      { position: { x: 3.5, y: 1.3, z: -3.5 }, image: createTitlePlaceholder('瑶医药房', { width: 480, height: 300 }), title: { zh: '瑶医药房', en: 'Yao Medicine House', za: 'Bouxyauz Yih Yoz Fangh' }, content: { zh: '瑶族传统医药世代相传，瑶浴、瑶药享誉盛名，药房中存放各类草药，为村民治病养生。', en: 'Yao traditional medicine passed down for generations. Yao herbal baths and medicines are renowned.', za: 'Bouxyauz cwnztungz yihyoz sihcaiz siengcwnz, Bouxyauz yug, Bouxyauz yoz yanghyij swnghmingh.' } },
      { position: { x: -3, y: 1.3, z: -4 }, image: createTitlePlaceholder('稻作文化展示', { width: 480, height: 300 }), title: { zh: '稻作文化展示', en: 'Rice Culture Exhibition', za: 'Dauj Coz Vwnzva Canjsiz' }, content: { zh: '龙脊红瑶世代在此种植水稻，创造世界级梯田景观，入选全球重要农业文化遗产。', en: 'Red Yao of Longji have cultivated rice here for generations, creating world-class terrace landscapes.', za: 'Lunghciz Hungzyauz sihcaiz youq neix cungh sujdauj, conghcaux seigyaiz giep ditenz ginghgvanh.' } }
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

