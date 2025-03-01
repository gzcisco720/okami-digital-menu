import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMenuStore } from '../../stores/menu.store';

interface HouseRuleDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const HouseRuleDialog = ({ open, handleClose }: HouseRuleDialogProps) => {
  const { menu } = useMenuStore();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>OKAMI HOUSE RULE</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <Box color='black'>
          <Typography variant="body1" gutterBottom>
            Bring an appetite because you’re going to need it at OKAMI – Camberwell – the Burke Road outlet of Melbourne’s favourite all-you-can-eat Japanese restaurant chain. 
            For one single price, an entire range of traditional entrees, sushi, mains and desserts are yours to enjoy for up to two hours, so bring your crew and plan ahead what you’re going to order. 
            Conveniently located just down the road from Camberwell railway station, this place tends to fill up every evening, which is why bookings are essential.
          </Typography>
          <b>PRICE</b>
          <Typography variant="body1" gutterBottom>
            Adult	${menu?.buffetPrice.toFixed(2)}/person
          </Typography>
          <Typography variant="body1" gutterBottom>
            Child (9-12 years)	$25.80/person
          </Typography>
          <Typography variant="body1" gutterBottom>
            Child (4-8 years)	$20.80/person
          </Typography>
          <Typography variant="body1" gutterBottom>
            Child (0-3 years)	Free
          </Typography>
          <ol>
            <li>
              <Typography variant="body1" gutterBottom>
                10% discount applies on All You Can Eat eaters for seniors (ID or age proof needed)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                BYO available (Wine and Champagne only), corkage of $10 / bottle applies.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                A 15% surcharge applies on Public Holidays.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                A 1.5% surcharge applies on Credit Card Payments.
              </Typography>
            </li>
          </ol>
          <b>DINING AND RESERVATION POLICY</b>
          <ol>
            <li>
              <Typography variant="body1" gutterBottom>
                All-You-Can-Eat (Drinks not included) requires a minimum of 2 payable guests for each reservation
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                For “All You Can Eat” bookings, the maximum sitting time is 2 hours from the reservation time.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                All reservation will be held for 15 minutes past the reserved time. If the party does not arrive within this grace period, the reservation may be forfeited.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom color='red'>
                Advance notice is essential for all dietary requirements. We kindly request our guests to inform us about any specific dietary needs during the reservation process. Please understand that we cannot accommodate completely celiac, gluten-free, and vegan dishes due to the potential of trace allergens in our working environment and supplied ingredients, making it challenging to ensure entirely achieving a certified 100% allergen-free status. We apologise for any inconvenience this may cause and appreciate your understanding in prioritizing the safety of all our guests.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                The restaurant is fully licensed and allows customers to BYO only wine with permission. There is a corkage fee of $10 per bottle.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Split bills are not permitted. The bill must be paid as a single payment.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                Please note that the senior price is applicable only to guests aged 60 years and older. We kindly request that you present your senior card or valid identification which includes your date of birth at the venue to apply the discount. Unfortunately, we won’t be able to process the discount without these documents.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom>
                OKAMI aims to minimize wastage. A wastage charge of $15 applies for any uneaten item exceeding 200g with an additional charge of $5 for every extra 100g. Please note that leftovers from our all-you-can-eat menu cannot be taken away and all-you-can-eat food cannot be shared with à la carte customers.
              </Typography>
            </li>
          </ol>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
