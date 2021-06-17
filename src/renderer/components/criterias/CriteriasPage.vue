<template>
  <div class="criterias-page">
    <table>
      <thead>
        <th></th>
        <th v-for="(criteria, criteria_uuid) in criterias" :key="criteria_uuid">
          {{ criteria.name }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(criteria, criteria_uuid) in criterias" :key="criteria_uuid">
          <td>{{ criteria.name }}</td>
          <td v-for="(compare_criteria, compare_criteria_uuid) in criterias" :key="compare_criteria_uuid">
            <input 
              @input="editCriteriaCriteria(criteria_uuid, compare_criteria_uuid, $event.target.value)"
              :value="criteriaCriteria[`${criteria_uuid}_${compare_criteria_uuid}`].value"
              :disabled="criteria_uuid == compare_criteria_uuid"
              type="number"
              min=1
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CriteriasPage',
  computed: {
    criterias() {
      return this.$store.state.Data.criterias;
    },
    criteriaCriteria() {
      return this.$store.state.Data.criteriaCriteria;
    },
  },
  methods: {
    editCriteriaCriteria(criteriaUuid, compareCriteriaUuid, value) {
      value = +value || 1;

      this.$store.dispatch('editCriteriaCriteria', {
        criteriaUuid, compareCriteriaUuid, data: { value },
      });

      this.$store.dispatch('editCriteriaCriteria', {
        criteriaUuid: compareCriteriaUuid,
        compareCriteriaUuid: criteriaUuid,
        data: { value: 1 / value },
      });
    }
  }
}
</script>

<style>
.criterias-page {
  padding: 40px;
}

.criterias-page input {
  margin-left: 10px;
}
</style>
