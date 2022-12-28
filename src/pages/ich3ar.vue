<template>
      <q-stepper
        v-model="step"
        ref="stepperRef"
        color="primary"
        bordered='false'
        animated
        class="my-special-class"
      >
        <q-step
          :name="1"
          title=""
          :done="step > 1"
        >
        <div class="row justify-center"><q-img class="" src="../assets/rafiki.png" width="50%" height="50%" /></div>
            <h5 class="q-my-none rtl">الاسم و اللقب</h5>
            <div class="rtl">
              <q-input outlined ref="step1RefName"  v-model="step1" label=" "
              :rules="[val => (val && val.length > 0) || 'الأسم و اللقب اجباري']" />
            </div>
              <h4  v-show="erorNP" class="q-my-none text-negative">الأسم و اللقب اجباري</h4>
            <h5 class="q-my-none rtl">الصفة</h5>
            <div class="rtl">
            <q-select v-model="option"  ref="step1RefOption" :options="options" label="الصفة" :rules="[val => val !== null && val !== '' || 'الصفة احبارية']" />
              <h4  v-show="erorO" class="q-my-none text-negative">الصفة اجبارية</h4>
            </div>
        </q-step>

        <q-step
          :name="2"
          title=""
          :done="step > 2"
        >
        <div class="row justify-center"><q-img src="../assets/cuate.png" width="50%" height="50%" /></div>
        <h5 class="q-my-none rtl">موضوع التهديد</h5>
        <div class="rtl">
        <q-select ref="step1RefSujet" v-model="sujet" :options="Sujet_menaces" label="" :rules="[val => val !== null && val !== '' || 'موضوع التهديد اجباري']"/>
          </div>
              <h4 class="q-my-none text-negative"  v-show="erorS">موضوع التهديد اجباري</h4>
        </q-step>

        <q-step
          :name="3"
          title=""
          :done="step > 3"
        >
        <div class="row justify-center"><q-img src="../assets/panas.png" width="50%" height="50%" /></div>
            <h5 class="q-my-none rtl">مكان التهديد</h5>
            <h5 class="q-my-none rtl">الولاية</h5>
            <div class="rtl">
            <q-select ref="step1RefRegion" v-model="region" :options="regions" label="الولاية" />
            </div>
            <h4 class="q-my-none text-negative"  v-show="erorR">الولابة اجبارية</h4>
    <h5 class="q-my-none rtl">العنوان كامل ان وجد</h5>
    <div class="rtl">
    <q-input outlined ref="step1RefAdress" v-model="adresse" label="" type="textarea"/>
  </div>
  </q-step>

        <q-step
          :name="4"
          title=""
          :done="step > 4"
        >
        <div class="row justify-center"><q-img src="../assets/pana.png" width="50%" height="50%" /></div>
            <h5 class="q-my-none rtl">رقم الهاتف للتواصل </h5>
            <div class="rtl">
            <q-input outlined ref="step1RefNumTel" v-model="numTel" label="" type="number"/>
</div>
            <h5 class="q-my-none rtl">معلومات اضافية </h5>
            <div class="rtl">
            <q-input outlined ref="step1RefInfo" v-model="info" label="" type="textarea"/>
</div>
            <br>
    <span class="q-my-none rtl">يمكنكم ايضا تنزيل صورة او وثيقة </span>
    <q-file filled bottom-slots v-model="upload" label="Label" counter>
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop.prevent="upload = null" class="cursor-pointer" />
            </template>

            <template v-slot:hint>
            <!--  Field hint  -->
            </template>
          </q-file>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="rtl">
            <q-btn @click="onContinueStep" color="primary" :label="step === 4 ? 'إرسال' : 'التالي'"></q-btn>
            <q-btn v-if="step > 1" flat color="primary" @click="onBackStep" label="عودة" class="q-ml-sm"></q-btn>
          </q-stepper-navigation>
        </template>
      </q-stepper>
      <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="column items-center">
          <table>
    <tbody>
        <tr>
            <td>{{ step1 }}</td>
            <td>الأسم و اللقب</td>
          </tr>
        <tr>
          <td>{{ option }}</td>
            <td>الصفة</td>
        </tr>
        <tr>
          <td>{{ sujet }}</td>
            <td>موضوع التهديد</td>
        </tr>
        <tr>
          <td>{{ region }}</td>
            <td>مكان التهديد</td>
        </tr>
        <tr>
          <td>{{ adresse }}</td>
          <td>عنوان التهديد</td>
        </tr>
        <tr>
          <td>{{ numTel }}</td>
          <td>رقم الهاتف</td>
        </tr>
        <tr>
          <td>{{ info }}</td>
          <td>معلومات اضافية</td>
        </tr>
        <tr>
          <td>{{ upload }}</td>
            <td>صورة او وثيقة</td>
        </tr>
    </tbody>
</table>
<q-checkbox v-model="mwefa9" label="أسمح لجمعية براءة بالإطلاع على جميع المعطيات الشخصية المدرجة بهذا الإشعار" />
<h4 class="q-my-none text-negative"  v-show="lazmektwefa">الموضوع اجباري</h4>
</q-card-section>

        <q-card-actions class="rtl"  align="left">
          <q-btn label="ارسال"  color="primary" @click.passive="valider()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </template>

<script>
/* eslint-disable */
import { useRouter } from 'vue-router'
  import { ref, defineComponent } from 'vue'
  import emailjs from '@emailjs/browser'
  import db from '../firebase/init'
  import firebase from 'firebase/app'
  import "firebase/storage";
  export default defineComponent({
  name: '555',
    setup () {
      const $router = useRouter()
      const erorO = ref(false)
      const erorR = ref(false)
      const mwefa9 = ref(false)
      const lazmektwefa = ref(false)
      const stepperRef = ref(null)
      const step1RefName = ref(null)
      const step1RefOption = ref(null)
      const step1RefRegion = ref(null)
      const step1RefAdress = ref(null)
      const step1RefNumTel = ref(null)
      const step1RefInfo = ref(null)
      const step2SujetAutre = ref('')
      const step3Ref = ref(null)
      const step = ref(1)
      const step1 = ref('')
      const step2 = ref('')
      const step3 = ref('')
      const option = ref('')
      const step1RefAutre = ref(null)
      const step1RefSujet = ref('')
      const sujet = ref('')
      const autreSujet = ref('')
      const autre = ref('')
      const erorS = ref(false)
      const erorNP = ref(false)
      const erorAutre = ref(false)
      const region = ref('')
      const adresse = ref(null)
      const numTel = ref(null)
      const info = ref(null)
      const upload = ref(null)
      const downloadURL = ref(null)
      const confirm = ref(false)
      const mandoubiya =ref([
          {
            'region': 'تونس',
            'nom': 'مندوب حماية الطفولة بتونس',
            'adresse': ' 44 شارع خير الدين باشا - الطابق الثاني - 1073 - تونس',
            'telelephone':
            {
              'telephone': 71905156,
              'fixe': 71905156
            },
            'email': 'dpe-tunis@delegue-enfance.nat.tn'
          },
          {
            'region': 'أريانة',
            'nom': 'مندوب حماية الطفولة بأريانة',
            'adresse': '16 نهج بالحسن جراد الحي الإداري - 2080 - أريانة',
            'telelephone':
            {
              'telephone': 70730664,
              'fixe': 70730664
            },
            'email': 'dpe-ariana@delegue-enfance.nat.tn'
          },
          {
            'region': 'منوبة',
            'nom': 'مندوب حماية الطفولة بمنوبة',
            'adresse': '32 نهج البرتقال بجانب إدارة أملاك الدولة والملكية العقارية - 2010 - منوبة',
            'telelephone':
            {
              'telephone': 71603568,
              'fixe': 71603568
            },
            'email': 'dpe-manouba@delegue-enfance.nat.tn'
          },
          {
            'region': 'بن عروس',
            'nom': 'مندوب حماية الطفولة ببن عروس',
            'adresse': '30 نهج عزيز تاج المدينة الجديدة - 2063 - بن عروس',
            'telelephone':
            {
              'telephone': 71313712,
              'fixe': 71313712
            },
            'email': 'dpe-benarous@delegue-enfance.nat.tn'
          },
          {
            'region': 'نابل',
            'nom': 'مندوب حماية الطفولة بنابل',
            'adresse': '115 شارع الحبيب ثامر - 8000 - نابل',
            'telelephone':
            {
              'telephone': 72224248,
              'fixe': 72224248
            },
            'email': 'dpe-nabeul@delegue-enfance.nat.tn'
          },
          {
            'region': 'زغوان',
            'nom': 'مندوب حماية الطفولة بزغوان',
            'adresse': 'نهج الشنفري - 1100 - زغوان',
            'telelephone':
            {
              'telephone': 72681108,
              'fixe': 72681108
            },
            'email': 'dpe-zaghouan@delegue-enfance.nat.tn'
          },
          {
            'region': 'بنزرت',
            'nom': 'مندوب حماية الطفولة ببنزرت',
            'adresse': '16 نهج اليونان ط4 - 7000 - بنزرت',
            'telelephone':
            {
              'telephone': 72422455,
              'fixe': 72424633
            },
            'email': 'dpe-bizerte@delegue-enfance.nat.tn'
          },
          {
            'region': 'سليانة',
            'nom': 'مندوب حماية الطفولة بسليانة',
            'adresse': 'نهج أبو القاسم الشابي، شارع الحبيب بورقيبة - 6100 - سليانة',
            'telelephone':
            {
              'telephone': 78872840,
              'fixe': 78872840
            },
            'email': 'dpe-siliana@delegue-enfance.nat.tn'
          },
          {
            'region': 'باجة',
            'nom': 'مندوب حماية الطفولة بباجة',
            'adresse': '17 نهج حسان بن النعمان - 9000 - باجة',
            'telelephone':
            {
              'telephone': 78452611,
              'fixe': 78442442
            },
            'email': 'dpe-beja@delegue-enfance.nat.tn'
          },
          {
            'region': 'جندوبة',
            'nom': 'مندوب حماية الطفولة بجندوبة',
            'adresse': '5 نهج الحمامات - 8100 - جندوبة',
            'telelephone':
            {
              'telephone': 78607288,
              'fixe': 78612017
            },
            'email': 'dpe-jendouba@delegue-enfance.nat.tn'
          },
          {
            'region': 'الكاف',
            'nom': 'مندوب حماية الطفولة بالكاف',
            'adresse': 'حي الرياض - 7100 - الكاف',
            'telelephone':
            {
              'telephone': 78223332,
              'fixe': 78225511
            },
            'email': 'dpe-kef@delegue-enfance.nat.tn'
          },
          {
            'region': 'المهدية',
            'nom': 'مندوب حماية الطفولة بالمهدية',
            'adresse': 'شارع اشبيلية قبالة مكتب البريد - 5100 - المهدية',
            'telelephone':
            {
              'telephone': 73693012,
              'fixe': 73693012
            },
            'email': 'dpe-mahdia@delegue-enfance.nat.tn'
          },
          {
            'region': 'سوسة',
            'nom': 'مندوب حماية الطفولة بسوسة',
            'adresse': 'عمارة بودخان، شارع ابن خلدون - 4003 - سوسة',
            'telelephone':
            {
              'telephone': 73334178,
              'fixe': 73334178
            },
            'email': 'dpe-sousse@delegue-enfance.nat.tn'
          },
          {
            'region': 'المنستير',
            'nom': 'مندوب حماية الطفولة بالمنستير',
            'adresse': 'عمارة بوزقور، شارع 7 نوفمبر - 5000 - المنستير',
            'telelephone':
            {
              'telephone': 73464007,
              'fixe': 73464007
            },
            'email': 'dpe-monastir@delegue-enfance.nat.tn'
          },
          {
            'region': 'صفاقس',
            'nom': 'مندوب حماية الطفولة بصفاقس',
            'adresse': 'نهج أحمد علولو إقامة الرضا متفرع عن شارع 14 جانفي قبالة مركز الولاية بجانب المحكمة الابتدائية صفاقس 2 - 3000 - صفاقس',
            'telelephone':
            {
              'telephone': 74402166,
              'fixe': 74402166
            },
            'email': 'dpe-sfax@delegue-enfance.nat.tn'
          },
          {
            'region': 'القصرين',
            'nom': 'مندوب حماية الطفولة بالقصرين',
            'adresse': '16 شارع الحسين زروق، حي النور - 1230 - القصرين',
            'telelephone':
            {
              'telephone': 77470281,
              'fixe': 77411185
            },
            'email': 'dpe-kasserine@delegue-enfance.nat.tn'
          },
          {
            'region': 'القيروان',
            'nom': 'مندوب حماية الطفولة بالقيروان',
            'adresse': 'المنصورة - 3100 - القيروان',
            'telelephone':
            {
              'telephone': 77232622,
              'fixe': 77237500
            },
            'email': 'dpe-kairouan@delegue-enfance.nat.tn'
          },
          {
            'region': 'سيدي بوزيد',
            'nom': 'مندوب حماية الطفولة بسيدي بوزيد',
            'adresse': '16 شارع محمد الخامس - 9100 - سيدي بوزيد',
            'telelephone':
            {
              'telephone': 76622450,
              'fixe': 76627220
            },
            'email': 'dpe-sidibouzid@delegue-enfance.nat.tn'
          },
          {
            'region': 'مدنين',
            'nom': 'مندوب حماية الطفولة بمدنين',
            'adresse': 'شارع الطيب المهيري - 4100 - مدنين',
            'telelephone':
            {
              'telephone': 75647523,
              'fixe': 75631803
            },
            'email': 'dpe-medenine@delegue-enfance.nat.tn'
          },
          {
            'region': 'قابس',
            'nom': 'مندوب حماية الطفولة بقابس',
            'adresse': 'شارع محمد علي - 6000 - قابس',
            'telelephone':
            {
              'telephone': 75275852,
              'fixe': 75274433
            },
            'email': 'dpe-gabes@delegue-enfance.nat.tn'
          },
          {
            'region': 'تطاوين',
            'nom': 'مندوب حماية الطفولة بتطاوين',
            'adresse': 'نهج الحبيب الغندور - 3200 - تطاوين',
            'telelephone':
            {
              'telephone': 75852635,
              'fixe': 75851602
            },
            'email': 'dpe-tataouine@delegue-enfance.nat.tn'
          },
          {
            'region': 'قفصة',
            'nom': 'مندوب حماية الطفولة بقفصة',
            'adresse': 'عمارة خلف الله ط2، حي النور - 2100 - قفصة',
            'telelephone':
            {
              'telephone': 76226214,
              'fixe': 76203150
            },
            'email': 'dpe-gafsa@delegue-enfance.nat.tn'
          },
          {
            'region': 'توزر',
            'nom': 'مندوب حماية الطفولة بتوزر',
            'adresse': '1 نهج محمد العايش قبالة مكتب مراقبة الأداؤات - 2200 - توزر',
            'telelephone':
            {
              'telephone': 76461112,
              'fixe': 76461112
            },
            'email': 'dpe-tozeur@delegue-enfance.nat.tn'
          },
          {
            'region': 'قبلي',
            'nom': 'مندوب حماية الطفولة بقبلي',
            'adresse': 'شارع الشهداء - 4200 - قبلي',
            'telelephone':
            {
              'telephone': 75493260,
              'fixe': 75493260
            },
            'email': 'dpe-kebili@delegue-enfancenat.tn'
          }])
      function onContinueStep () {
        switch (step.value) {
          case 1:
            if (step1.value === '') {
              erorNP.value = true
            } else {
              erorNP.value = false
            }
            if ( option.value ==='') {
              erorO.value = true
            } else {
              erorO.value = false
            }
            if (option.value != '' && step1.value!='' ) {
             stepperRef.value.next()
            }
            break
          case 2:
            if(sujet.value === ''){
              erorS.value = true
            } else {
              stepperRef.value.next()
            }
            break
          case 3:
            if(region.value===''){
              erorR.value=true
            } else {
              stepperRef.value.next()
            }
            break
          default:
          add()
          break
        }
      }
      function onBackStep () {
        stepperRef.value.previous()
      }
      function onFileChange (e) {
        // eslint-disable-next-line
        return upload.value = e.target.files[0] || e.dataTransfer.files[0]
      }
    async function  save () {

        mandoubiya.value.forEach(mandoubiyaa => {
          if (mandoubiyaa.region === region.value) {
            /*
            await emailjs.send('process.env.Service_ID', 'process.env.Template_ID', {
              region: region.value,
              etat: option.value,
              Sujet_menace: sujet.value,
              num_tel: numTel.value,
              nom: step1.value,
              adresse: adresse.value,
              info: info.value,
              url: downloadURL.value,
              reply_to: 'hafedh20@gmail.com'
            }, 'process.env.PUBLICKEY')*/
            console.log(
              'region.value ==/',region.value,
              'etat ==/',option.value,
              'menace ==/',sujet.value,
              'numTel.value ==/',numTel.value,
              'step1.value ==/',step1.value,
              'adresse.value ==/',adresse.value,
              'info.value ==/',info.value,
              'downloadURL.value ==/',downloadURL.value
              )
              $router.push('/end')
          }
        })
      }
      async function add () {
        if(upload.value!=null){
          const storageRef = await firebase.storage().ref()
        var upa = 0
        // console.log(storageRef)
        const docRef = await storageRef.child(upload.value.name)
        await docRef.put(upload.value).on(
  
        'state_changed',
          (snapshot) => {
           upa = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          }, (err) => {
            console.log(err)
          }
        )
        console.log(upa);
        if(upa===100)
        {
                  downloadURL.value = await docRef.getDownloadURL()
await change()
        }        

        }
        else{
          change()
        }
      }
      function change() {
        confirm.value = true
      }
      function valider() {
        if(mwefa9.value){
          save()
          confirm.value = false
        } else{
          lazmektwefa.value=true
        }
      }
      return {
        $router,
        erorO,
        onFileChange,
        step,
        save,
        lazmektwefa,
        mwefa9,
        valider,
        change,
        erorR,
        confirm,
        regions: [
          'تونس',
          'صفاقس',
          'نابل',
          'سوسة',
          'بن عروس',
          'أريانة',
          'القيروان',
          'بنزرت',
          'المنستير',
          'مدنين',
          'القصرين',
          'سيدي بوزيد',
          'المهدية',
          'جندوبة',
          'منوبة',
          'قابس',
          'قفصة',
          'باجة',
          'الكاف',
          'سليانة',
          'زغوان',
          'قبلي',
          'تطاوين',
          'توزر'
        ],
        step1,
        downloadURL,
        step1RefNumTel,
        step1RefInfo,
        step2,
        step3,
        stepperRef,
        step1RefName,
        step1RefAutre,
        step1RefAdress,
        step2SujetAutre,
        step3Ref,
        option,
        step1RefOption,
        step1RefRegion,
        step1RefSujet,
        sujet,
        autre,
        erorS,
        erorNP,
        erorAutre,
        autreSujet,
        region,
        numTel,
        info,
        upload,
        onContinueStep,
        onBackStep,
        add,
        options: [
          'طفل',
          'ولي',
          'مواطن/شاهد',
          'مؤسسة عمومية',
          'جمعية / منظمة',
          'اخر'
        ],
        Sujet_menaces: [
          'فقدان السند العائلي',
          'تعريض الطفل للإهمال و التشرد',
          'تقصير في التربية و الرعاية',
          'سوء معاملة الطفل',
          'استغلال الطفل جنسيا',
          'استغلال الطفل في الاجرام المنظم',
          'تعريض الطفل للتسول و الاستغلاله تقتصاديا',
          'عجز الابوين عن رعاية الطفل',
          'محاولة انتحار',
          'ولادة خارج اطار الزواج',
          'صعوبات نفسية',
          'انقطاع مبكر عن الدراسة',
          'سلوكيات محفوفة بالمخاطر',
          'اخر'
        ],
        mandoubiya
      }
    }
  })
  </script>
  <style lang="scss" scoped>
  
table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}
.rtl{
  direction: rtl;
}
.test {
  margin-left: 100%;
}
</style>