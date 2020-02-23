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
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- body end -->

                  <div class="card-footer text-muted">
                     <div class="text-right">
                        <button type="button" class="btn discard btn-primary btn-sm">
                           Discard
                        </button>
                        <button type="submit" class="btn save btn-secondary btn-sm">
                           save
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <!-- secondary column -->
            <div class="secondary col-2">
               <ul class="list-group">
                  <li class="list-group-item">
                     <a type="button" class="btn preview btn-sm btn-outline-dark">
                        Preview
                     </a>
                  </li>
                  <li class="list-group-item">
                     <button type="button" class="btn share btn-primary btn-sm">
                        share
                     </button>
                  </li>
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
export default {
   data: () => ({
      postMsg: false,
      attemptSubmit: false,
      form: {
         title: 'My demo',
         content: 'Good contents',
         author: 'Suvradip Saha',
         keyWords: 'hello, world',
         date: '11/10/2091',
      },
      action: '/speech',
   }),

   computed: {},

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
         //  if (this.isEmpty(this.form.keyWords)) return false;
         //  if (this.isEmpty(this.form.date)) return false;

         console.log('Great');
         this.$service
            .postDb(this.action, this.form)
            .then(response => {
               if (response.status === 200) {
                  console.log('content received');
                  this.postMsg = true;
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

      .btn {
         border: none;
         &.discard {
            background: $colorOne;
         }
         &.save {
            background: $colorTwo;
         }
      }
   }

   .secondary {
      .btn {
         &.share {
            border: none;
            background: $secondaryColor;
            padding: 10px 20px;
         }
      }
      ul li {
         border: 0;
      }
   }
}
</style>
