package aim.youngRating.service;

import aim.youngRating.dto.ActivityDetailsDto;
import aim.youngRating.dto.ActivityDto;
import aim.youngRating.dto.ActivityRequest;
import aim.youngRating.dto.UserDto;
import aim.youngRating.model.Activity;
import aim.youngRating.model.User;
import aim.youngRating.model.enums.ActivityCategory;
import aim.youngRating.model.enums.ActivityStatus;
import aim.youngRating.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RatingService {

    private final ActivityRepository activityRepository;

    private static final Map<String, List<Integer>> activityPointsMap = Map.ofEntries(
            Map.entry("Обучение в аспирантуре/докторантуре", List.of(20)),
            Map.entry("Наличие ученой степени по направлению профессиональной деятельности", List.of(30)),
            Map.entry("Организация выездных мероприятий и технической учебы на объекты ПАО «Газпром»", List.of(20)),
            Map.entry("Участие с докладами в рамках технической учебы в ООО «Газпром инвест»", List.of(5)),
            Map.entry("Участие в научно-практической конференции, форумах, семинарах, круглых столах, конкурсах, технической учебе внутри Общества", List.of(5)),
            Map.entry("Участие в научно-практической конференции, форумах, семинарах, круглых столах или конкурсах в других ДО ПАО «Газпром» или сторонних организациях по направлению деятельности Общества", List.of(10)),
            Map.entry("Призовое место в научно-практической конференции конференциях, форумах, семинарах, круглых столах или конкурсах внутри Общества, других ДО ПАО «Газпром» или сторонних организациях по направлению деятельности Общества", List.of(20, 15, 10)),
            Map.entry("Публикации в отраслевом научном журнале вне перечня ВАК в отчетный период", List.of(10)),
            Map.entry("Публикация в отраслевом журнале из перечня ВАК в отчетный период", List.of(20)),
            Map.entry("Оформление и внедрение рационализаторского предложения внутри Общества", List.of(10)),
            Map.entry("Получение или наличие действующего патента Общества на изобретение, полезную модель, промышленный образец, автором (соавтором) которого является участник в отчетном периоде", List.of(20)),
            Map.entry("Участие в сдаче нормативов ГТО", List.of(20)),
            Map.entry("Участие в спартакиаде ПАО «Газпром»", List.of(20)),
            Map.entry("Призовое место в рамках спартакиады ПАО «Газпром», в том числе в командных видах спорта", List.of(50, 40, 30)),
            Map.entry("Участие в спортивных мероприятиях внутри Общества", List.of(5)),
            Map.entry("Участие в спортивных мероприятиях среди других ДО ПАО «Газпром» или иных организаций", List.of(5)),
            Map.entry("Призовое место за участие в спортивных мероприятиях Общества или среди других ДО ПАО «Газпром» и иных организаций", List.of(30, 20, 10)),
            Map.entry("Помощь в организации спортивных мероприятий для сотрудников Общества", List.of(30)),
            Map.entry("Участие в социальных мероприятиях, Обществом", List.of(10)),
            Map.entry("Организация благотворительных и социально-значимых мероприятий, организуемых СМС", List.of(15)),
            Map.entry("Участие в конкурсе «Факел» ПАО «Газпром»", List.of(10)),
            Map.entry("Призовое место в рамках конкурса «Факел» ПАО «Газпром»", List.of(25, 20, 15)),
            Map.entry("Участие в культурно-массовых мероприятиях внутри Общества", List.of(5)),
            Map.entry("Участие в культурно-массовых мероприятиях ДО ПАО «Газпром» или иных организаций", List.of(5)),
            Map.entry("Участие в организации культурно-массовых мероприятий внутри Общества", List.of(10)),
            Map.entry("Участие в подготовке публикаций на Интранет-портал, для корпоративный газеты и телеграм каналах Общества", List.of(3)),
            Map.entry("Участие в организации мероприятий, направленных на развитие бренда СМС Общества", List.of(5)),
            Map.entry("Участие в активе СМС Общества в отчетный период", List.of(25, 15, 10)),
            Map.entry("Оценка деятельности в активе СМС (осуществляется председателем СМС)", List.of(100, 50))
    );

    private static final Map<ActivityCategory, List<String>> activityNames = Map.of(
            ActivityCategory.SCIENTIFIC, Arrays.asList(
                    "Обучение в аспирантуре/докторантуре",
                    "Наличие ученой степени по направлению профессиональной деятельности",
                    "Организация выездных мероприятий и технической учебы на объекты ПАО «Газпром»",
                    "Участие с докладами в рамках технической учебы в ООО «Газпром инвест»",
                    "Участие в научно-практической конференции, форумах, семинарах, круглых столах, конкурсах, технической учебе внутри Общества",
                    "Участие в научно-практической конференции, форумах, семинарах, круглых столах или конкурсах в других ДО ПАО «Газпром» или сторонних организациях по направлению деятельности Общества",
                    "Призовое место в научно-практической конференции конференциях, форумах, семинарах, круглых столах или конкурсах внутри Общества, других ДО ПАО «Газпром» или сторонних организациях по направлению деятельности Общества",
                    "Публикации в отраслевом научном журнале вне перечня ВАК в отчетный период",
                    "Публикация в отраслевом журнале из перечня ВАК в отчетный период",
                    "Оформление и внедрение рационализаторского предложения внутри Общества",
                    "Получение или наличие действующего патента Общества на изобретение, полезную модель, промышленный образец, автором (соавтором) которого является участник в отчетном периоде"
            ),
            ActivityCategory.SPORT, Arrays.asList(
                    "Участие в сдаче нормативов ГТО",
                    "Участие в спартакиаде ПАО «Газпром»",
                    "Призовое место в рамках спартакиады ПАО «Газпром», в том числе в командных видах спорта",
                    "Участие в спортивных мероприятиях внутри Общества",
                    "Участие в спортивных мероприятиях среди других ДО ПАО «Газпром» или иных организаций",
                    "Призовое место за участие в спортивных мероприятиях Общества или среди других ДО ПАО «Газпром» и иных организаций",
                    "Помощь в организации спортивных мероприятий для сотрудников Общества"
            ),
            ActivityCategory.SOCIAL, Arrays.asList(
                    "Участие в социальных мероприятиях, Обществом",
                    "Организация благотворительных и социально-значимых мероприятий, организуемых СМС",
                    "Участие в конкурсе «Факел» ПАО «Газпром»",
                    "Призовое место в рамках конкурса «Факел» ПАО «Газпром»",
                    "Участие в культурно-массовых мероприятиях внутри Общества",
                    "Участие в культурно-массовых мероприятиях ДО ПАО «Газпром» или иных организаций",
                    "Участие в организации культурно-массовых мероприятий внутри Общества",
                    "Участие в подготовке публикаций на Интранет-портал, для корпоративный газеты и телеграм каналах Общества",
                    "Участие в организации мероприятий, направленных на развитие бренда СМС Общества"
            ),
            ActivityCategory.ORGANIZATIONAL, Arrays.asList(
                    "Участие в активе СМС Общества в отчетный период",
                    "Оценка деятельности в активе СМС (осуществляется председателем СМС)"
            )
    );

    @Autowired
    public RatingService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activityRepository.findByUserIdOrderByDateDesc(userId);
    }

    public Activity createActivity(ActivityRequest activityRequest, User user) {
        Activity activity = new Activity();
        activity.setName(activityRequest.getName());
        activity.setDescription(activityRequest.getDescription());
        activity.setDate(activityRequest.getDate());
        activity.setCategory(activityRequest.getCategory());
        activity.setDocumentUrl(activityRequest.getDocumentUrl());
        activity.setUser(user);
        activity.setStatus(ActivityStatus.PENDING);
        activity.setPoints(0); // Points are awarded upon approval
        return activityRepository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity rejectActivity(Long activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        activity.setStatus(ActivityStatus.REJECTED);
        activity.setPoints(0);

        return activityRepository.save(activity);
    }

    public Activity approveActivity(Long activityId, int points) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        activity.setPoints(points);
        activity.setStatus(ActivityStatus.APPROVED);

        return activityRepository.save(activity);
    }

    public ActivityDto convertToDto(Activity activity) {
        User user = activity.getUser();
        UserDto userDto = new UserDto(user.getId(), user.getFullName(), user.getEmail());
        return new ActivityDto(
                activity.getId(),
                activity.getName(),
                activity.getDescription(),
                activity.getDate(),
                activity.getPoints(),
                activity.getStatus(),
                activity.getCategory(),
                activity.getDocumentUrl(),
                userDto
        );
    }

    public Map<ActivityCategory, List<ActivityDetailsDto>> getActivityDetails() {
        return activityNames.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream()
                                .map(name -> new ActivityDetailsDto(name, activityPointsMap.getOrDefault(name, Collections.emptyList())))
                                .collect(Collectors.toList())
                ));
    }
}
