<template>
   <div class="container">
      <form v-if="!postMsg" @submit.prevent="onSubmit">
         <div class="row">
            <div class="col-10">
               <div class="card">
                  <div class="card-header">
                     <div class="input-group title">
                        <input
                           v-model.trim="form.title"
                           type="text"
                           class="form-control"
                           :class="[
                              { 'is-invalid': attemptSubmit && isEmpty(form.title) },
                              { 'is-valid': attemptSubmit && !isEmpty(form.title) },
                           ]"
                           autocomplete="off"
                           placeholder="Title of this speech"
                        />
                        <div class="invalid-feedback">
                           Please enter a wonderful title for this speech.
                        </div>
                        <div class="valid-feedback">
                           sounds good
                        </div>
                     </div>
                  </div>
                  <!-- body start -->
                  <div class="card-body">
                     <div class="col-12 p-0">
                        <div class="input-group">
                           <textarea
                              v-model.trim="form.content"
                              class="form-control"
                              rows="8"
                              :class="[
                                 { 'is-invalid': attemptSubmit && isEmpty(form.content) },
                                 { 'is-valid': attemptSubmit && !isEmpty(form.content) },
                              ]"
                           ></textarea>
                           <div class="invalid-feedback">
                              Please write few words.
                           </div>
                           <div class="valid-feedback">
                              sounds good
                           </div>
                        </div>
                     </div>
                     <div class="fields row mt-1">
                        <div class="col-4">
                           <div class="form-group row">
                              <label for="author" class="col-form-label">Author</label>
                              <div class="col-sm-10">
                                 <input
                                    id="author"
                                    v-model.trim="form.author"
                                    type="text"
                                    class="form-control"
                                    placeholder="name"
                                    :class="[
                                       { 'is-invalid': attemptSubmit && isEmpty(form.author) },
                                       { 'is-valid': attemptSubmit && !isEmpty(form.author) },
                                    ]"
                                    autocomplete="off"
                                 />
                                 <div class="invalid-feedback">
                                    who are you?
                                 </div>
                                 <div class="valid-feedback">
                                    sounds good
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-4">
                           <div class="form-group row">
                              <label for="keyWords" class="col-form-label">Keywords</label>
                              <div class="col-sm-10">
                                 <input
                                    id="keyWords"
                                    v-model.trim="form.keyWords"
                                    type="text"
                                    class="form-control"
                                    placeholder="universe, world"
                                 />
                              </div>
                           </div>
                        </div>
                        <div class="col-4">
                           <div class="form-group row">
                              <label for="datePick" class="col-form-label">Date</label>
                              <div class="col-sm-10">
                                 <input
                                    id="datePick"
                                    v-model.trim="form.date"
                                    type="text"
                                    class="form-control"
                                    placeholder="DD/MM/YYYY"
                                    autocomplete="off"
                                    :class="[
                                       { 'is-invalid': attemptSubmit && !isEmpty(form.date) && !validateDate },
                                       { 'is-valid': attemptSubmit && !isEmpty(form.date) && validateDate },
                                    ]"
                                 />
                                 <div class="invalid-feedback">
                                    Try use DD/MM/YYYY format.
                                 </div>
                                 <div class="valid-feedback">
                                    Awessom!
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- body end -->

                  <div class="card-footer text-muted">
                     <div class="text-right">
                        <div>
                           <button type="button" class="btn discard btn-primary btn-sm" @click="deleteIt">
                              Discard
                           </button>
                           <button type="submit" class="btn save btn-secondary btn-sm">
                              save
                           </button>
                        </div>
                        <p class="led" v-text="formFeed" />
                     </div>
                  </div>
               </div>
            </div>
            <!-- secondary column -->
            <div class="secondary col-2">
               <ul class="list-group">
                  <li class="list-group-item">
                     <button class="btn preview btn-sm btn-outline-dark" @click.prevent="openPreview">
                        Preview
                     </button>
                     <div v-if="showPreviewError" class="led error-feedback">
                        Please save this current draft before previewing.
                     </div>
                  </li>
                  <!-- <li class="list-group-item">
                     <a
                        :href="`mailto:?subject=${form.title}&body=${form.content}`"
                        class="btn share btn-primary btn-sm"
                     >
                        share
                     </a>
                  </li> -->
               </ul>
            </div>
         </div>
      </form>

      <!-- success message -->
      <div v-if="postMsg" class="alert border p-2 ">
         <h6 class="mt-0 mb-1">Speech saved</h6>
         <p class="mb-1">You can view this speech using this link.</p>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   async fetch({ store, query, error }) {
      const { id = '' } = query;
      try {
         if (id !== '') {
            await store.dispatch('FETCH_SPEECHES', {
               slug: id,
            });
         }
      } catch (e) {
         //  error({ statusCode: 404 });
      }
   },

   data() {
      // console.log(this.speech.title);
      return {
         postMsg: false,
         attemptSubmit: false,
         form: {
            title: '',
            content: '',
            author: '',
            keyWords: '',
            date: '',
            id: '',
         },
         action: '/speech',
         showPreviewError: false,
         formFeed: '',
      };
   },

   computed: {
      ...mapState({
         speech: state => state.speeches,
      }),

      validateDate() {
         const regx = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/);
         return regx.test(this.form.date);
      },
   },

   mounted() {
      const { id = '' } = this.$route.query;
      if (id !== '' && typeof this.speech !== 'undefined' && typeof this.speech === 'object') {
         this.form.id = id;
         this.form.title = this.speech.title || '';
         this.form.content = this.speech.content || '';
         this.form.author = this.speech.author || '';
         this.form.keyWords = this.speech.keyWords || '';
         //  const d = new Date(this.speech.date);
         this.form.date = this.speech.date;
      } else {
         this.$router.push({ query: {} });
      }
   },

   methods: {
      isEmpty(field) {
         if (field === '' || typeof field === 'undefined') return true;
         return false;
      },

      onSubmit(evt) {
         evt.preventDefault();
         this.attemptSubmit = true;
         if (this.isEmpty(this.form.title)) return false;
         if (this.isEmpty(this.form.author)) return false;
         if (this.isEmpty(this.form.content)) return false;
         //  if (!this.isEmpty(this.form.date) && this.validateDate) return false;

         this.$axios
            .post(this.action, this.form)
            .then(response => {
               if (response.status === 200) {
                  console.log('content received');
                  // this.postMsg = true;
                  this.form.id = response.data.id;
                  this.formFeed = 'Data saved successfully.';
                  setTimeout(() => {
                     this.formFeed = '';
                  }, 3000);
               }
            })
            .catch(err => console.error('fail', err));
      },

      openPreview() {
         if (this.form.id === '') {
            this.showPreviewError = true;
            setTimeout(() => {
               this.showPreviewError = false;
            }, 3000);
         } else {
            this.$router.push(`/preview/${this.form.id}`);
         }
      },

      deleteIt() {
         this.$axios
            .delete(`${this.action}/${this.form.id}`)
            .then(response => {
               if (response.status === 200) {
                  this.$router.push('/');
               }

               if (response.status !== 200) {
                  console.warn('unable to delete it.');
               }
            })
            .catch(err => console.error('fail', err));
      },
   },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';
.container {
   .card {
      .card-body {
         padding-top: 0;

         .fields label {
            font-size: 14px;
            font-weight: 500;
         }
      }
   }

   .secondary {
      ul li {
         border: 0;
      }
   }

   .error-feedback {
      margin-top: 10px;
      font-size: 13px;
      color: #ff0000;
   }
}
</style>
