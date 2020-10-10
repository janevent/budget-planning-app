const updateTotalDifference = (templateId, totalDifference) => {
    return {
        type: 'EDIT_TEMPLATE_UPDATE_TOTAL_DIF',
        templateId: templateId,
        totalDifference
    }
}

export default updateTotalDifference;