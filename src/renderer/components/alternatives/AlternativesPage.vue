<template>
  <div class="alternatives-page">
    <div class="compare" v-for="(criteria, criteria_uuid) in criterias" :key="criteria_uuid">
      <h1>{{ criteria.name }}</h1>

      <table>
        <thead>
          <th></th>
          <th 
            style="padding-bottom: 10px"
            v-for="(option, option_uuid) in options" 
            :key="option_uuid"
          >
            {{ option.name }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(option, option_uuid) in options" :key="option_uuid">
            <td>{{ option.name }}</td>
            <td 
              v-for="(compare_option, compare_option_uuid) in options"
              :key="compare_option_uuid"
            >
              <input 
                @input="editCriteriaOptionOption(criteria_uuid, option_uuid, compare_option_uuid, $event.target.value)"
                :value="criteriaOptionOption[`${criteria_uuid}_${option_uuid}_${compare_option_uuid}`].value"
                :disabled="option_uuid === compare_option_uuid"
                type="number"
                min=1
              >
            </td>
          </tr>
          <tr>
            <td></td>
            <td 
              style="text-align: center; font-weight: 800; padding-top: 20px;"
              v-for="(compare_option, compare_option_uuid) in options"
              :key="compare_option_uuid"
            >
              {{ optionCriteria[`${compare_option_uuid}_${criteria_uuid}`].value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlternativesPage',
  computed: {
    options() {
      return this.$store.state.Data.options;
    },
    criterias() {
      return this.$store.state.Data.criterias;
    },
    optionCriteria() {
      return this.$store.state.Data.optionCriteria;
    },
    criteriaOptionOption() {
      return this.$store.state.Data.criteriaOptionOption;
    },
  },
  methods: {
    editCriteriaOptionOption(criteriaUuid, optionUuid, compareOptionUuid, value) {
      value = +value || 1;

      this.$store.dispatch('editCriteriaOptionOption', {
        criteriaUuid, optionUuid, compareOptionUuid, data: { value: value },
      });

      this.$store.dispatch('editCriteriaOptionOption', {
        criteriaUuid,
        optionUuid: compareOptionUuid,
        compareOptionUuid: optionUuid,
        data: { value: 1 / value },
      });
    }
  }
}
</script>

<style>
.alternatives-page {
  padding: 40px;
}

.alternatives-page input {
  margin-left: 10px;
}

.compare {
  margin-bottom: 60px;
}
</style>
