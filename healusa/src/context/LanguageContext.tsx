import { createContext, useState, type ReactNode } from 'react';

export interface LanguageContextType {
    language: 'en' | 'zh';
    t: (key: string) => string;
    setLanguage: (lang: 'en' | 'zh') => void;
}

const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.procedures': 'Procedures',
        'nav.contact': 'Contact',
        'nav.appointment': 'Book Appointment',

        // Home Page
        'home.title': 'Welcome to HealUSA Medical Assistance',
        'home.subtitle': 'Professional medical services for Chinese patients seeking healthcare in the United States',
        'home.features': 'Why Choose Us?',
        'home.feature1': 'Expert Doctors',
        'home.feature1_desc': 'Board-certified physicians with 15+ years of experience',
        'home.feature2': 'Advanced Technology',
        'home.feature2_desc': 'State-of-the-art medical equipment and facilities',
        'home.feature3': 'Multilingual Support',
        'home.feature3_desc': 'Fluent Chinese and English support throughout your journey',
        'home.feature4': 'Affordable Costs',
        'home.feature4_desc': 'Competitive pricing with transparent billing',
        'home.cta_title': 'Ready to Book Your Appointment?',
        'home.cta_subtitle': 'Schedule a consultation with our medical team today',

        // About Page
        'about.title': 'About HealUSA',
        'about.subtitle': 'Dedicated to providing excellent medical care to international patients',
        'about.mission': 'Our Mission',
        'about.mission_desc': 'To provide accessible, high-quality medical services to Chinese patients seeking treatment in the United States. We believe in making healthcare affordable and stress-free through personalized care and comprehensive support.',
        'about.team': 'Our Team',
        'about.medical_director': 'Medical Director',
        'about.coordinator': 'Patient Coordinator',
        'about.translator': 'Medical Translator',
        'about.team_desc1': '15+ years of surgical experience, specializing in orthopedic procedures',
        'about.team_desc2': '10+ years managing international patient care and logistics',
        'about.team_desc3': '12+ years of medical translation and patient communication',
        'about.experience': 'Our Experience',
        'about.patients': 'Patients Treated',
        'about.years': 'Years in Business',
        'about.procedures': 'Procedures Offered',
        'about.satisfaction': 'Patient Satisfaction',
        'about.why_choose': 'Why Choose HealUSA?',
        'about.reason1': 'Accredited hospitals and certified surgeons',
        'about.reason2': 'Complete translation and interpretation services',
        'about.reason3': 'Assistance with visa and travel arrangements',
        'about.reason4': 'Post-operative care and follow-up support',

        // Services Page
        'services.title': 'Our Medical Services',
        'services.subtitle': 'Comprehensive healthcare solutions tailored to your needs',
        'services.dental': 'Dental Services',
        'services.dental_desc': 'Complete dental care including cosmetic and restorative procedures',
        'services.vision': 'Vision Care',
        'services.vision_desc': 'Advanced eye surgery and vision correction procedures',
        'services.orthopedic': 'Orthopedic Surgery',
        'services.orthopedic_desc': 'Joint replacement and orthopedic procedures',
        'services.cardiology': 'Cardiology',
        'services.cardiology_desc': 'Heart and cardiovascular disease treatment',
        'services.neurology': 'Neurology',
        'services.neurology_desc': 'Brain and nervous system procedures',
        'services.reproductive': 'Reproductive Health',
        'services.reproductive_desc': 'Fertility, obstetric, and gynecological services',
        'services.process': 'Our Process',
        'services.step1': 'Consultation',
        'services.step1_desc': 'Free initial consultation to assess your needs',
        'services.step2': 'Planning',
        'services.step2_desc': 'Personalized treatment plan creation',
        'services.step3': 'Procedure',
        'services.step3_desc': 'Professional medical care at accredited hospitals',
        'services.step4': 'Follow-up',
        'services.step4_desc': 'Comprehensive post-operative care',

        // Procedures Page
        'procedures.title': 'Procedure Catalog',
        'procedures.subtitle': 'Browse our comprehensive list of available medical procedures',
        'procedures.all': 'All Categories',
        'procedures.dental': 'Dental',
        'procedures.vision': 'Vision',
        'procedures.orthopedic': 'Orthopedic',
        'procedures.cardiology': 'Cardiology',
        'procedures.reproductive': 'Reproductive',
        'procedures.search_placeholder': 'Search procedures...',
        'procedures.filter': 'Filter by Category',
        'procedures.showing': 'Showing',
        'procedures.results': 'results',
        'procedures.price': 'Price Range',
        'procedures.duration': 'Duration',
        'procedures.inquiry': 'Send Inquiry',
        'procedures.no_results': 'No procedures found. Try adjusting your search.',

        // Contact Page
        'contact.title': 'Get In Touch',
        'contact.subtitle': 'Have questions? We\'re here to help!',
        'contact.address': 'Address',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.hours': 'Business Hours',
        'contact.name': 'Full Name',
        'contact.name_placeholder': 'Your full name',
        'contact.email_address': 'Email Address',
        'contact.email_placeholder': 'your@email.com',
        'contact.phone_number': 'Phone Number',
        'contact.phone_placeholder': '+1 (XXX) XXX-XXXX',
        'contact.subject': 'Subject',
        'contact.subject_placeholder': 'How can we help?',
        'contact.message': 'Message',
        'contact.message_placeholder': 'Please provide details...',
        'contact.send': 'Send Message',
        'contact.success': 'Thank you! We\'ll get back to you soon.',

        // Appointment Page
        'appointment.title': 'Book Your Appointment',
        'appointment.subtitle': 'Schedule a consultation with our medical team',
        'appointment.name': 'Full Name',
        'appointment.name_placeholder': 'Your full name',
        'appointment.email': 'Email Address',
        'appointment.email_placeholder': 'your@email.com',
        'appointment.phone': 'Phone Number',
        'appointment.phone_placeholder': '+1 (XXX) XXX-XXXX',
        'appointment.procedure': 'Procedure of Interest',
        'appointment.select_procedure': 'Select a procedure',
        'appointment.date': 'Preferred Date',
        'appointment.time': 'Preferred Time',
        'appointment.select_time': 'Select a time',
        'appointment.notes': 'Additional Notes',
        'appointment.notes_placeholder': 'Any medical history or special requests...',
        'appointment.book': 'Book Appointment',
        'appointment.success': 'Your appointment request has been submitted! We\'ll confirm shortly.',
        'appointment.info': 'Need Help?',
        'appointment.info_text': 'Our patient coordinators are available to assist with scheduling. Contact us at info@healusa.com or call +1 (212) 555-0123.',

        // Not Found Page
        'notfound.title': 'Page Not Found',
        'notfound.message': 'Sorry, the page you\'re looking for doesn\'t exist.',
        'notfound.back_home': 'Back to Home',

        // Footer
        'footer.copyright': '© 2024 HealUSA. All rights reserved.',
    },
    zh: {
        // 导航
        'nav.home': '首页',
        'nav.about': '关于我们',
        'nav.services': '服务',
        'nav.procedures': '医疗程序',
        'nav.contact': '联系我们',
        'nav.appointment': '预约',

        // 首页
        'home.title': '欢迎来到 HealUSA 医疗援助',
        'home.subtitle': '为寻求美国医疗服务的中国患者提供专业医疗服务',
        'home.features': '为什么选择我们?',
        'home.feature1': '专家医生',
        'home.feature1_desc': '拥有15年以上经验的认证医师',
        'home.feature2': '先进技术',
        'home.feature2_desc': '最先进的医疗设备和设施',
        'home.feature3': '多语言支持',
        'home.feature3_desc': '全程流利的中英文支持',
        'home.feature4': '经济实惠',
        'home.feature4_desc': '具有竞争力的价格和透明账单',
        'home.cta_title': '准备预约?',
        'home.cta_subtitle': '立即与我们的医疗团队安排咨询',

        // 关于页面
        'about.title': '关于 HealUSA',
        'about.subtitle': '致力于为寻求美国治疗的中国患者提供优质医疗服务',
        'about.mission': '我们的使命',
        'about.mission_desc': '为寻求美国治疗的中国患者提供可获得、高质量的医疗服务。我们通过个性化护理和全面支持，让医疗保健变得经济实惠且无忧。',
        'about.team': '我们的团队',
        'about.medical_director': '医疗主任',
        'about.coordinator': '患者协调员',
        'about.translator': '医学翻译',
        'about.team_desc1': '15年以上手术经验，专门从事骨科手术',
        'about.team_desc2': '10年以上国际患者护理和物流管理经验',
        'about.team_desc3': '12年以上医学翻译和患者沟通经验',
        'about.experience': '我们的经验',
        'about.patients': '接受治疗的患者',
        'about.years': '年运营',
        'about.procedures': '提供的程序',
        'about.satisfaction': '患者满意度',
        'about.why_choose': '为什么选择 HealUSA?',
        'about.reason1': '认证医院和认证外科医生',
        'about.reason2': '完整的翻译和口译服务',
        'about.reason3': '协助签证和旅行安排',
        'about.reason4': '术后护理和跟进支持',

        // 服务页面
        'services.title': '我们的医疗服务',
        'services.subtitle': '根据您的需求定制的综合医疗保健解决方案',
        'services.dental': '牙科服务',
        'services.dental_desc': '包括美容和修复程序的完整牙科护理',
        'services.vision': '视力护理',
        'services.vision_desc': '先进的眼科手术和视力矫正程序',
        'services.orthopedic': '骨科手术',
        'services.orthopedic_desc': '关节置换和骨科手术',
        'services.cardiology': '心脏病学',
        'services.cardiology_desc': '心脏和心血管疾病治疗',
        'services.neurology': '神经学',
        'services.neurology_desc': '脑和神经系统手术',
        'services.reproductive': '生殖健康',
        'services.reproductive_desc': '生育、产科和妇科服务',
        'services.process': '我们的流程',
        'services.step1': '咨询',
        'services.step1_desc': '免费初步咨询评估您的需求',
        'services.step2': '计划',
        'services.step2_desc': '制定个性化治疗计划',
        'services.step3': '程序',
        'services.step3_desc': '在认证医院提供专业医疗护理',
        'services.step4': '跟进',
        'services.step4_desc': '全面的术后护理',

        // 医疗程序页面
        'procedures.title': '医疗程序目录',
        'procedures.subtitle': '浏览我们的综合可用医疗程序列表',
        'procedures.all': '所有类别',
        'procedures.dental': '牙科',
        'procedures.vision': '视力',
        'procedures.orthopedic': '骨科',
        'procedures.cardiology': '心脏病学',
        'procedures.reproductive': '生殖',
        'procedures.search_placeholder': '搜索程序...',
        'procedures.filter': '按类别筛选',
        'procedures.showing': '显示',
        'procedures.results': '结果',
        'procedures.price': '价格范围',
        'procedures.duration': '持续时间',
        'procedures.inquiry': '发送咨询',
        'procedures.no_results': '未找到程序。尝试调整您的搜索。',

        // 联系页面
        'contact.title': '联系我们',
        'contact.subtitle': '有问题？我们很乐意帮助！',
        'contact.address': '地址',
        'contact.phone': '电话',
        'contact.email': '电子邮件',
        'contact.hours': '营业时间',
        'contact.name': '全名',
        'contact.name_placeholder': '您的全名',
        'contact.email_address': '电子邮件地址',
        'contact.email_placeholder': 'your@email.com',
        'contact.phone_number': '电话号码',
        'contact.phone_placeholder': '+1 (XXX) XXX-XXXX',
        'contact.subject': '主题',
        'contact.subject_placeholder': '我们可以如何帮助？',
        'contact.message': '消息',
        'contact.message_placeholder': '请提供详细信息...',
        'contact.send': '发送消息',
        'contact.success': '感谢！我们会尽快与您联系。',

        // 预约页面
        'appointment.title': '预约',
        'appointment.subtitle': '与我们的医疗团队安排咨询',
        'appointment.name': '全名',
        'appointment.name_placeholder': '您的全名',
        'appointment.email': '电子邮件地址',
        'appointment.email_placeholder': 'your@email.com',
        'appointment.phone': '电话号码',
        'appointment.phone_placeholder': '+1 (XXX) XXX-XXXX',
        'appointment.procedure': '感兴趣的程序',
        'appointment.select_procedure': '选择程序',
        'appointment.date': '首选日期',
        'appointment.time': '首选时间',
        'appointment.select_time': '选择时间',
        'appointment.notes': '其他备注',
        'appointment.notes_placeholder': '任何病历或特殊要求...',
        'appointment.book': '预约',
        'appointment.success': '您的预约请求已提交！我们会尽快确认。',
        'appointment.info': '需要帮助？',
        'appointment.info_text': '我们的患者协调员可以协助安排。请通过 info@healusa.com 或 +1 (212) 555-0123 与我们联系。',

        // 未找到页面
        'notfound.title': '页面未找到',
        'notfound.message': '抱歉，您查找的页面不存在。',
        'notfound.back_home': '返回首页',

        // 页脚
        'footer.copyright': '© 2024 HealUSA. 版权所有。',
    }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<'en' | 'zh'>('en');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, t, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
